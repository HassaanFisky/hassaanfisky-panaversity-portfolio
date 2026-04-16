import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext.js';
import styles from './Notebook.module.css';
import clsx from 'clsx';

const Notebook = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('hassaan_notebook_notes');
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }
  }, []);

  // Sync state with open transitions
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('hassaan_notebook_notes', notes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm(t?.notebook?.clearConfirm || 'Clear all notes?')) {
      setNotes('');
      localStorage.removeItem('hassaan_notebook_notes');
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className={clsx(styles.notebookWrapper, isOpen && styles.notebookOpen)}>
      <div className={styles.notebookHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.notebookIcon}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span className={styles.notebookTitle}>{t?.notebook?.title || 'Study Notebook'}</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className={styles.notebookBody}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t?.notebook?.placeholder || 'Jot down your robotics notes here...'}
          spellCheck="false"
        />
        
        <div className={styles.notebookFooter}>
          <div className={styles.stats}>
            {notes.length} {t?.notebook?.chars || 'characters'}
          </div>
          <div className={styles.actions}>
            <button className={styles.clearBtn} onClick={handleClear} title={t?.notebook?.clear || 'Clear'}>
              {t?.notebook?.clear || 'Clear'}
            </button>
            <button className={clsx(styles.saveBtn, isSaved && styles.saved)} onClick={handleSave}>
              {isSaved ? (t?.notebook?.saved || 'Saved!') : (t?.notebook?.save || 'Save')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Texture reinforcement */}
      <div className={styles.shimmer} />
    </div>
  );
};

export default Notebook;
