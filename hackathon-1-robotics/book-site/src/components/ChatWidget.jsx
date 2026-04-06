// src/components/ChatWidget.jsx
// HASSAAN AI ARCHITECT — ChatWidget v3.0
// Language-aware, scoped to H1 Physical AI / Robotics context.
// Renders as panel adjacent to ActionDock button (not floating FAB).

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import clsx from 'clsx';

// ── CONTENT RENDERER ────────────────────────────────────────────────────────
function RenderContent({ content, role }) {
  if (role === 'user') {
    return <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{content}</p>;
  }

  const lines = content.split('\n');
  return (
    <div className="humanist-message-content">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Heading: e.g. "Protocol:", "Note:", "Explanation:"
        const isHeading = /^[A-Z][A-Za-z\s]{1,30}:\s*$/.test(trimmed);
        if (isHeading) {
          return (
            <div key={i} className="humanist-chat-heading">
              {line}
            </div>
          );
        }

        // Bullets
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.match(/^\d+\./)) {
          return (
            <p key={i} className="humanist-chat-list-item">
              {line}
            </p>
          );
        }

        return (
          <p key={i} className="humanist-chat-body">
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ChatWidget({ inDock = false, forcedOpen = false, onToggle }) {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [index, setIndex] = useState(null);
  const [documents, setDocuments] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const getInitialMessages = useCallback(() => [
    {
      role: 'assistant',
      content: t?.chat?.greeting || "Hello! I am your Physical AI guide. How can I help you explore robotics today?",
    },
  ], [t]);

  const [messages, setMessages] = useState(() => [
    {
      role: 'assistant',
      content: "Hello! I am your Physical AI guide. How can I help you explore robotics today?",
    },
  ]);

  // Update greeting when language changes
  useEffect(() => {
    if (t?.chat?.greeting) {
      setMessages([{ role: 'assistant', content: t.chat.greeting }]);
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync open state with dock
  useEffect(() => {
    if (inDock) {
      setIsOpen(forcedOpen);
      if (forcedOpen) {
        setIsExpanded(true);
        // Focus input after open animation
        setTimeout(() => inputRef.current?.focus(), 350);
      }
    }
  }, [forcedOpen, inDock]);

  // Scroll to latest message
  useEffect(() => {
    if (isExpanded && isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded, isOpen, isTyping]);

  // Load lunr RAG index (H1 Robotics scoped)
  useEffect(() => {
    let cancelled = false;
    async function loadIndex() {
      try {
        const resp = await fetch('/chat-index.json');
        if (!resp.ok) return;
        const docs = await resp.json();
        if (cancelled) return;
        setDocuments(docs);
        const lunr = (await import('lunr')).default;
        const idx = lunr(function () {
          this.ref('id');
          this.field('title', { boost: 2 });
          this.field('section');
          this.field('text');
          docs.forEach((doc) => this.add(doc));
        });
        if (!cancelled) setIndex(idx);
      } catch (err) {
        // Silent fail — chatbot still works without RAG
        console.warn('[ChatWidget] RAG index unavailable:', err.message);
      }
    }
    loadIndex();
    return () => { cancelled = true; };
  }, []);

  const performSearch = useCallback((queryStr) => {
    if (!index || !queryStr.trim()) return [];
    try {
      const raw = index.search(`${queryStr}* ${queryStr}~1`);
      return raw
        .slice(0, 2)
        .map((r) => documents.find((d) => String(d.id) === String(r.ref)))
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [index, documents]);

  const handleClose = useCallback(() => {
    if (onToggle) onToggle(false);
    else setIsOpen(false);
  }, [onToggle]);

  const handleSend = useCallback(async () => {
    const trimmed = inputVal.trim();
    if (!trimmed || isTyping) return;

    setInputVal('');
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setIsTyping(true);

    const hits = performSearch(trimmed);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          language: lang,           // scoped language context
          platform: 'h1-robotics',  // scoped platform context
          history: messages.slice(-6),
          context: hits[0]?.text ?? null,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      setIsTyping(false);
      if (data?.answer) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.answer,
            sources: data.sources || (hits[0] ? [hits[0].title] : []),
          },
        ]);
      } else {
        throw new Error('Empty response');
      }
    } catch (err) {
      setIsTyping(false);
      // Graceful degradation message — language-aware
      const fallback = lang === 'ur'
        ? 'معذرت، ابھی کنکشن کا مسئلہ ہے۔ دوبارہ کوشش کریں۔'
        : lang === 'ro'
        ? 'Maafi chahta hun, abhi connection ka masla hai. Dobara koshish karen.'
        : 'Connection issue — please try again in a moment.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: fallback },
      ]);
    }
  }, [inputVal, isTyping, messages, lang, performSearch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // ── DOCK MODE: Render as panel adjacent to dock ──────────────────────────
  if (inDock) {
    return (
      <div
        className={clsx(
          'chat-widget-dock-panel',
          isOpen && 'chat-dock-panel-open'
        )}
        role="dialog"
        aria-modal="false"
        aria-label="AI Robotics Companion"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="humanist-avatar shadow-glow">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div className="chat-title-wrapper">
              <span className="chat-title font-serif">
                {t?.chat?.title || 'AI Robotics Guide'}
              </span>
              <span className="chat-subtitle">{t?.chat?.subtitle || 'Knowledge Base v2.4'}</span>
            </div>
          </div>

          <div className="chat-header-actions">
            <button
              className="chat-toggle"
              onClick={() => setIsExpanded((v) => !v)}
              title={isExpanded ? 'Collapse' : 'Expand'}
              aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"
                style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.3s ease' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <button
              className="chat-close"
              onClick={handleClose}
              title={t?.chat?.close || 'Close'}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={clsx('chat-body', !isExpanded && 'collapsed')}>
          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={clsx('msg', m.role === 'assistant' ? 'msg-bot' : 'msg-user')}>
                <RenderContent content={m.content} role={m.role} />
                {m.sources?.length > 0 && (
                  <div className="msg-sources">
                    <span className="source-label">Source:</span>
                    {m.sources.map((s, idx) => (
                      <span key={idx} className="source-tag font-serif">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="msg msg-bot" aria-label="AI is thinking">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t?.chat?.placeholder || 'Ask me anything...'}
              disabled={isTyping}
              aria-label="Chat input"
              maxLength={500}
            />
            <button
              className="btn-send shadow-glow"
              onClick={handleSend}
              disabled={isTyping || !inputVal.trim()}
              aria-label={t?.chat?.send || 'Send'}
              title={t?.chat?.send || 'Send'}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STANDALONE MODE: Floating FAB (not used in current Root.js) ──────────
  return null;
}
