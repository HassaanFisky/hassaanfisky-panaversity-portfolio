import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const ECOSYSTEM_APPS = [
  { name: "Portfolio Hub", image: "https://raw.githubusercontent.com/Hassaanfisky/hassaanfisky-panaversity-portfolio/main/public/blueprint-footer.png", url: "https://panaversity-h0-portfolio.vercel.app", id: "h0" },
  { name: "Physical AI & Robotics", image: "https://panaversity-h1-robotics.vercel.app/h1-thumb.png", url: "https://panaversity-h1-robotics.vercel.app", id: "h1" },
  { name: "Evolution of Todo", image: "https://hackathon-2-todo-iota.vercel.app/h2-thumb.png", url: "https://hackathon-2-todo-iota.vercel.app", id: "h2" },
  { name: "LearnFlow Engine", image: "https://hassaanfisky-panaversity-learnflow.vercel.app/h2-thumb.png", url: "https://hassaanfisky-panaversity-learnflow.vercel.app", id: "h3" },
  { name: "Companion FTE", image: "https://panaversity-h4-companion.vercel.app/h4-thumb.png", url: "https://panaversity-h4-companion.vercel.app", id: "h4" },
];

export default function EcosystemNav() {
  const [active, setActive] = useState(false);
  const [authActive, setAuthActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleSignIn = () => {
    if (typeof window !== 'undefined') {
       window.location.href = "https://panaversity-h0-portfolio.vercel.app/auth?redirect=" + encodeURIComponent(window.location.href);
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 10000 }}>
        <button 
          onClick={handleSignIn}
          style={{ 
            width: '48px', height: '48px', 
            background: 'var(--glass-bg, rgba(250, 249, 246, 0.9))', 
            backdropFilter: 'blur(18px)', 
            border: '1px solid var(--border)', 
            borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', 
            boxShadow: '0 8px 24px -4px rgba(217,119,87,0.18)',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'rgba(217,119,87,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          title="Initialize Uplink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>

      <div className="ecosystem-nav-container">
        <div className={clsx("ecosystem-panel", active && "active")}>
          <div className="ecosystem-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Ecosystem Grid</span>
            <span style={{ fontSize: '8px', opacity: 0.6, letterSpacing: '0.2em' }}>WIRED</span>
          </div>
          <div className="ecosystem-panel-items">
            {ECOSYSTEM_APPS.map((app) => (
              <a key={app.id} href={app.url} className="ecosystem-item" style={{ gap: '1rem', padding: '12px' }}>
                <div className="ecosystem-item-icon" style={{ padding: 0, overflow: 'hidden', width: '40px', height: '40px', borderRadius: '8px' }}>
                  <img src={app.image} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="ecosystem-item-label" style={{ flex: 1 }}>
                  <span className="ecosystem-item-name" style={{ fontSize: '12px', fontWeight: 'bold' }}>{app.name}</span>
                  <span className="ecosystem-item-id" style={{ fontSize: '9px', fontStyle: 'italic' }}>{app.id.toUpperCase()} Node</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <button 
          className={clsx("ecosystem-nav-trigger", active && "active")}
          onClick={() => setActive(!active)}
          aria-label="Toggle Ecosystem Hub"
          style={{ width: '56px', height: '56px' }}
        >
          <div className="ecosystem-nav-pulse" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
          </svg>
        </button>
      </div>
    </>
  );
}
