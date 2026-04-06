// src/components/ActionDock/ActionDock.jsx
// HASSAAN AI ARCHITECT — ActionDock v3.0
// 3-Button Layout: Language | Snow | AI Chatbot
// Fixes: Dark-mode white bg, Snow toggle, Language 3-option, ChatWidget integration

import React, { useState, useEffect } from 'react';
import { useLanguage, languages } from '../../context/LanguageContext';
import ChatWidget from '../ChatWidget';
import Notebook from '../Notebook/Notebook';
import styles from './ActionDock.module.css';

const ActionDock = () => {
  const { lang, changeLanguage, t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isSnowActive, setIsSnowActive] = useState(false);

  useEffect(() => {
    // Load persisted snow state without flash/glitch
    const savedSnow = localStorage.getItem('let_it_snow') === '1';
    setIsSnowActive(savedSnow);

    // Staggered magnetic entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Close lang menu on outside click
  useEffect(() => {
    if (!showLangMenu) return;
    const handler = (e) => {
      if (!e.target.closest('[data-lang-dock]')) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showLangMenu]);

  const toggleSnow = () => {
    const newState = !isSnowActive;
    setIsSnowActive(newState);
    localStorage.setItem('let_it_snow', newState ? '1' : '0');
    window.dispatchEvent(new CustomEvent('snow-toggle', { detail: { active: newState } }));
  };

  const handleLangSelect = (key) => {
    changeLanguage(key);
    setShowLangMenu(false);
  };

  return (
    <div className={`${styles.dockContainer} ${isLoaded ? styles.loaded : ''}`}>
      
      {/* ── BUTTON 1: Language Switch ─────────────────────────────────────── */}
      <div className={styles.dockItem} style={{ '--idx': 1 }} data-lang-dock>
        <button
          className={`${styles.dockButton} ${showLangMenu ? styles.activeItem : ''}`}
          onClick={() => setShowLangMenu(v => !v)}
          title={t?.ui?.language || 'Language'}
          aria-label="Select Language"
          aria-expanded={showLangMenu}
        >
          {/* Globe icon */}
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className={styles.langBadge}>{languages[lang]?.short || 'EN'}</span>
        </button>

        {/* Language Dropdown — 3 options only */}
        <div className={`${styles.langDropdown} ${showLangMenu ? styles.showDropdown : ''}`} role="menu">
          {Object.entries(languages).map(([key, value]) => (
            <button
              key={key}
              role="menuitem"
              className={`${styles.langOption} ${lang === key ? styles.activeLang : ''}`}
              onClick={() => handleLangSelect(key)}
            >
              <span className={styles.langOptionFlag}>{value.short}</span>
              <span>{value.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── BUTTON 2: Snow Toggle ─────────────────────────────────────────── */}
      <div className={styles.dockItem} style={{ '--idx': 2 }}>
        <button
          className={`${styles.dockButton} ${isSnowActive ? styles.activeItem : ''}`}
          onClick={toggleSnow}
          title={isSnowActive ? (t?.snow?.disable || 'Stop Snow') : (t?.snow?.enable || 'Let it Snow')}
          aria-label="Toggle Snow"
          aria-pressed={isSnowActive}
        >
          {/* Snowflake icon */}
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <path d="m20 10-8-8-8 8" />
            <path d="m20 14-8 8-8-8" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="m6 6 3 3-3 3" />
            <path d="m18 6-3 3 3 3" />
          </svg>
          {isSnowActive && <span className={styles.activePulse} aria-hidden="true" />}
        </button>
      </div>

      {/* ── BUTTON 3: AI Chatbot ─────────────────────────────────────────── */}
      <div className={styles.dockItem} style={{ '--idx': 3 }}>
        <button
          className={`${styles.dockButton} ${styles.chatButton} ${isChatOpen ? styles.activeItem : ''}`}
          onClick={() => setIsChatOpen(v => !v)}
          title={t?.ui?.companion || 'AI Companion'}
          aria-label="Open AI Chatbot"
          aria-pressed={isChatOpen}
        >
          {/* Lightning bolt / AI icon */}
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isChatOpen ? 'rotate(15deg)' : 'none', transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
          {/* Lightning Glass shimmer ring */}
          <span className={`${styles.glassRing} ${isChatOpen ? styles.glassRingActive : ''}`} aria-hidden="true" />
        </button>

        {/* Chat panel rendered adjacent to dock */}
        <ChatWidget inDock={true} forcedOpen={isChatOpen} onToggle={setIsChatOpen} />
      </div>

      {/* ── BUTTON 4: Study Notebook ─────────────────────────────────────── */}
      <div className={styles.dockItem} style={{ '--idx': 4 }}>
        <button
          className={`${styles.dockButton} ${isNotebookOpen ? styles.activeItem : ''}`}
          onClick={() => {
            setIsNotebookOpen(v => !v);
            if (isChatOpen) setIsChatOpen(false); // Close chat if opening notebook
          }}
          title={t?.notebook?.title || 'Study Notebook'}
          aria-label="Open Study Notebook"
          aria-pressed={isNotebookOpen}
        >
          {/* Book icon */}
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          {/* Lightning Glass shimmer ring */}
          <span className={`${styles.glassRing} ${isNotebookOpen ? styles.glassRingActive : ''}`} aria-hidden="true" />
        </button>

        {/* Notebook panel rendered adjacent to dock */}
        <Notebook isOpen={isNotebookOpen} onClose={() => setIsNotebookOpen(false)} />
      </div>
    </div>
  );
};

export default ActionDock;
