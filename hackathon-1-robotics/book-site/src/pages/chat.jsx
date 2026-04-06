import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './chat.module.css';

/**
 * Chat Page
 * A dedicated, grounded search interface for the textbook.
 * Uses the High-Fidelity Humanist design system.
 */
export default function Chat() {
  const [index, setIndex]         = useState(null);
  const [documents, setDocuments] = useState([]);
  const [query, setQuery]         = useState('');
  const [results, setResults]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const inputRef                  = useRef(null);

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
        const lunrIndex = lunr(function () {
          this.ref('id');
          this.field('title', { boost: 2 });
          this.field('section');
          this.field('text');
          docs.forEach(doc => this.add(doc));
        });

        if (!cancelled) {
          setIndex(lunrIndex);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load index", err);
        if (!cancelled) setLoading(false);
      }
    }
    loadIndex();
    return () => { cancelled = true; };
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!index || !query.trim()) return;

    const searchResults = index.search(`${query.trim()}* ${query.trim()}~1`);
    const hits = searchResults.slice(0, 5).map(result => {
      const doc = documents.find(d => String(d.id) === String(result.ref));
      return { ...doc, score: result.score };
    }).filter(Boolean);

    setResults(hits);
  };

  const shareOnWhatsApp = () => {
    const url = window.location.origin;
    const text = `Explore the Physical AI & Humanoid Robotics Textbook with the grounded Aira assistant: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <Layout title="Assistant" description="Grounded search for the robotics curriculum">
      <div className={styles.chatPageContainer}>
        
        <header className={styles.chatPageHeader}>
          <div className={styles.badge}>Grounded Intelligence</div>
          <h1 className={styles.title}>Aira Search</h1>
          <p className={styles.subtitle}>
            Explore the robotics curriculum through an offline, secure, and precise search interface.
          </p>
        </header>

        <div className={styles.searchBoxCard}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about kinematics, sensors, or ROS 2..."
              className={styles.searchInput}
              autoFocus
            />
            <button type="submit" className={styles.searchButton} disabled={loading || !query.trim()}>
              {loading ? 'Analyzing Textbook...' : 'Search'}
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className={`${styles.resultsArea} animated-in`}>
            <div className={styles.resultsBadge}>
              Found {results.length} related passages
            </div>
            
            <div className={styles.resultsGrid}>
              {results.map((hit, i) => (
                <div key={i} className={styles.resultCard}>
                  <div className={styles.resultHeader}>
                    <span className={styles.resultChapter}>{hit.title}</span>
                    <span className={styles.resultSection}>{hit.section}</span>
                  </div>
                  <div className={styles.resultBody}>
                    <p>{hit.text}</p>
                  </div>
                  <div className={styles.resultFooter}>
                    <a href={hit.url} className={styles.readLink}>
                      Read Chapter <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && query && !loading && (
          <div className={styles.emptyState}>
            <p>I couldn't find a direct match. Try broad terms like "sensors", "control", or "intelligence".</p>
          </div>
        )}

        <footer className={styles.chatPageFooter}>
          <button onClick={shareOnWhatsApp} className={styles.shareBtn}>
            Share Curriculum 📱
          </button>
        </footer>
      </div>
    </Layout>
  );
}
