/**
 * CompanionChat — H1 Docusaurus Robotics Textbook variant.
 * Uses the /api/chat endpoint (Groq → HF fallback chain).
 * Inline styles used where Tailwind shims are absent in H1.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, Sparkles, Loader2, Bookmark, MessageCircle,
  Bot, Eraser, PanelLeftOpen, PanelLeftClose,
} from "lucide-react";
import { useLanguage } from "@site/src/context/LanguageContext";

function makeGreeting(platform) {
  return {
    role:      "assistant",
    content:   platform === "H1"
      ? "Hello! I am Aira, your Physical AI Textbook companion. Ask me anything about robotics."
      : `Hello! I am Aira, your ${platform} assistant. How can I help you today?`,
    timestamp: new Date().toISOString(),
  };
}

export function CompanionChat({
  platform, context, session, onUpdateMessages, onClose, sidebarOpen, onToggleSidebar,
}) {
  const { lang } = useLanguage();
  const [input,     setInput]     = useState("");
  const [isTyping,  setIsTyping]  = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [notes,     setNotes]     = useState("");

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  const messages = session?.messages ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (activeTab === "chat") inputRef.current?.focus();
  }, [activeTab]);

  useEffect(() => {
    const saved = localStorage.getItem(`aira-notes-${platform}`);
    if (saved) setNotes(saved);
  }, [platform]);

  useEffect(() => {
    localStorage.setItem(`aira-notes-${platform}`, notes);
  }, [notes, platform]);

  // aira-prefill: external source injects a query
  useEffect(() => {
    const handler = (e) => {
      const { query } = e.detail ?? {};
      if (query) { setInput(query); setActiveTab("chat"); }
    };
    window.addEventListener("aira-prefill", handler);
    return () => window.removeEventListener("aira-prefill", handler);
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isTyping) return;
    const content    = input.trim();
    const userMsg    = { role: "user", content, timestamp: new Date().toISOString() };
    const updated    = [...messages, userMsg];
    onUpdateMessages(updated);
    setInput("");
    setIsTyping(true);

    try {
      const apiMessages = updated.map(({ role, content }) => ({ role, content }));
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: apiMessages, context, platform, lang }),
      });
      const data = await res.json();
      onUpdateMessages([...updated, {
        role:      "assistant",
        content:   data.error ? `Error: ${data.error}` : (data.content ?? "No response received."),
        timestamp: new Date().toISOString(),
      }]);
    } catch {
      onUpdateMessages([...updated, {
        role:      "assistant",
        content:   "I'm having trouble connecting right now. Please try again.",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages, onUpdateMessages, context, platform, lang]);

  const clearSession = () => onUpdateMessages([makeGreeting(platform)]);

  const isRTL = lang === "ur";

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%", minWidth: 0, overflow: "hidden" }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{
        padding:      "0.875rem 1.25rem",
        borderBottom: "0.8px solid var(--border-fine)",
        background:   "rgba(var(--bg), 0.4)",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "space-between",
        flexShrink:   0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            style={{
              width:          "2rem",
              height:         "2rem",
              borderRadius:   "0.5rem",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              color:          "var(--text-muted)",
              background:     "transparent",
              border:         "none",
              cursor:         "pointer",
              transition:     "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.background = "var(--bg-elevated)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {sidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
          </button>
          {/* Platform + title */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{
                fontSize:      "9px",
                fontWeight:    700,
                letterSpacing: "0.3em",
                color:         "var(--accent)",
                textTransform: "uppercase",
                fontFamily:    "var(--font-mono, monospace)",
              }}>
                {platform} NODE
              </span>
              <div style={{
                width:        "6px",
                height:       "6px",
                borderRadius: "50%",
                background:   isTyping ? "var(--accent)" : "#10b981",
                animation:    isTyping ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none",
              }} />
            </div>
            <h3 style={{
              fontSize:   "1.125rem",
              fontFamily: "var(--ifm-heading-font-family)",
              fontWeight: 700,
              color:      "var(--text-primary)",
              margin:     0,
              lineHeight: 1.2,
            }}>
              {session?.title ?? "Aira Assistant"}
            </h3>
          </div>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close companion"
          style={{
            width:          "2.25rem",
            height:         "2.25rem",
            borderRadius:   "50%",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          "var(--text-muted)",
            background:     "rgba(255,255,255,0.1)",
            border:         "0.8px solid var(--border-fine)",
            cursor:         "pointer",
            transition:     "all 0.2s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseOut={(e)  => { e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div style={{
        margin:       "0.875rem 1.5rem 0",
        display:      "flex",
        border:       "0.8px solid var(--border-fine)",
        borderRadius: "1rem",
        padding:      "0.25rem",
        background:   "var(--bg-elevated)",
        flexShrink:   0,
      }}>
        {[
          { key: "chat",     Icon: MessageCircle, label: "Protocol" },
          { key: "notebook", Icon: Bookmark,      label: "Notebook"  },
        ].map(({ key, Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              flex:           1,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            "0.4rem",
              padding:        "0.5rem",
              borderRadius:   "0.75rem",
              fontSize:       "10px",
              fontWeight:     700,
              textTransform:  "uppercase",
              letterSpacing:  "0.1em",
              cursor:         "pointer",
              transition:     "all 0.2s",
              border:         "none",
              background:     activeTab === key ? "var(--bg)" : "transparent",
              color:          activeTab === key ? "var(--accent)" : "var(--text-muted)",
              boxShadow:      activeTab === key ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
            }}
          >
            <Icon size={13} strokeWidth={2.4} /> {label}
          </button>
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div
        style={{
          flex:       1,
          overflowY:  "auto",
          padding:    "1rem 1.5rem",
          display:    "flex",
          flexDirection: "column",
          gap:        "1rem",
          msOverflowStyle: "none",
          scrollbarWidth:  "none",
        }}
        className="scrollbar-hide"
      >
        {activeTab === "chat" ? (
          <>
            {messages.map((msg, i) => (
              <motion.div
                key={`${session?.id ?? "s"}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.22 }}
                style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}
              >
                <div style={{
                  maxWidth:     "85%",
                  padding:      "0.875rem 1rem",
                  borderRadius: "1.25rem",
                  fontSize:     "0.875rem",
                  lineHeight:   1.6,
                  ...(msg.role === "user" ? {
                    background:   "var(--accent)",
                    color:        "#fff",
                    borderTopRightRadius: "0.375rem",
                  } : {
                    background:   "var(--bg-elevated)",
                    border:       "0.8px solid var(--border-fine)",
                    color:        "var(--text-secondary)",
                    borderTopLeftRadius: "0.375rem",
                    fontFamily:   "var(--ifm-heading-font-family)",
                    fontStyle:    "italic",
                  }),
                }}>
                  {msg.content}
                </div>
                <span style={{
                  fontSize:      "8px",
                  fontWeight:    700,
                  color:         "var(--text-muted)",
                  marginTop:     "0.375rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity:       0.6,
                  padding:       "0 0.25rem",
                }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
              >
                <div style={{
                  padding:             "0.875rem 1rem",
                  borderRadius:        "1.25rem",
                  borderTopLeftRadius: "0.375rem",
                  background:          "var(--bg-elevated)",
                  border:              "0.8px solid var(--border-fine)",
                  color:               "var(--text-muted)",
                  fontSize:            "0.875rem",
                  display:             "flex",
                  alignItems:          "center",
                  gap:                 "0.5rem",
                }}>
                  <Loader2 size={12} style={{ animation: "spin 1s linear infinite", color: "var(--accent)" }} />
                  Aira is thinking…
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width:          "2rem",
                  height:         "2rem",
                  background:     "var(--bg-surface)",
                  borderRadius:   "0.5rem",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  color:          "var(--accent)",
                  border:         "0.8px solid var(--border-fine)",
                }}>
                  <Bot size={16} />
                </div>
                <h4 style={{
                  fontFamily: "var(--ifm-heading-font-family)",
                  fontSize:   "0.875rem",
                  fontWeight: 700,
                  color:      "var(--text-primary)",
                  margin:     0,
                }}>
                  Architect Notes
                </h4>
              </div>
              <span style={{
                fontSize:      "8px",
                fontWeight:    700,
                color:         "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                background:    "var(--bg-elevated)",
                padding:       "0.25rem 0.5rem",
                borderRadius:  "0.375rem",
              }}>
                Local Sync
              </span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Log research findings, architecture decisions, or notes…"
              style={{
                flex:         1,
                width:        "100%",
                background:   "var(--bg-elevated)",
                border:       "0.8px solid var(--border-fine)",
                borderRadius: "1rem",
                padding:      "1.25rem",
                fontSize:     "0.875rem",
                color:        "var(--text-secondary)",
                lineHeight:   1.6,
                fontFamily:   "var(--ifm-heading-font-family)",
                fontStyle:    "italic",
                resize:       "none",
                outline:      "none",
                transition:   "border-color 0.2s",
              }}
              onFocus={(e)  => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={(e)   => { e.target.style.borderColor = "var(--border-fine)"; }}
            />
            <div style={{
              display:       "flex",
              alignItems:    "center",
              gap:           "0.5rem",
              fontSize:      "9px",
              fontWeight:    700,
              color:         "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              opacity:       0.6,
              padding:       "0 0.25rem 0.5rem",
            }}>
              <Sparkles size={10} style={{ color: "var(--accent)" }} /> Notes are auto-synced to your local node.
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input footer ───────────────────────────────────────────────────── */}
      <div style={{
        padding:       "1rem 1.25rem",
        borderTop:     "0.8px solid var(--border-fine)",
        background:    "rgba(252,250,248,0.3)",
        backdropFilter: "blur(12px)",
        flexShrink:    0,
      }}>
        <div style={{ position: "relative" }} className="group">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Aira anything…"
            disabled={isTyping}
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              width:        "100%",
              padding:      "0.875rem 6rem 0.875rem 1.25rem",
              borderRadius: "1rem",
              background:   "var(--bg-surface)",
              border:       "0.8px solid var(--border-fine)",
              fontSize:     "0.875rem",
              color:        "var(--text-primary)",
              outline:      "none",
              transition:   "border-color 0.2s",
              boxSizing:    "border-box",
            }}
            onFocus={(e)  => { e.target.style.borderColor = "var(--accent)"; }}
            onBlur={(e)   => { e.target.style.borderColor = "var(--border-fine)"; }}
          />
          <div style={{
            position:       "absolute",
            right:          "0.5rem",
            top:            "50%",
            transform:      "translateY(-50%)",
            display:        "flex",
            alignItems:     "center",
            gap:            "0.375rem",
          }}>
            <button
              onClick={clearSession}
              title="Clear session"
              disabled={isTyping}
              style={{
                width:          "2.25rem",
                height:         "2.25rem",
                borderRadius:   "0.75rem",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:          "var(--text-muted)",
                background:     "transparent",
                border:         "none",
                cursor:         "pointer",
                transition:     "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#f87171";
                e.currentTarget.style.background = "rgba(248,113,113,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Eraser size={15} />
            </button>
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              style={{
                padding:        "0 0.875rem",
                height:         "2.25rem",
                background:     "var(--accent)",
                color:          "#fff",
                borderRadius:   "0.75rem",
                border:         "none",
                cursor:         isTyping || !input.trim() ? "not-allowed" : "pointer",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                transition:     "all 0.2s",
                opacity:        isTyping ? 0.5 : 1,
              }}
            >
              {isTyping
                ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                : <Send    size={16} strokeWidth={2.4} />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
