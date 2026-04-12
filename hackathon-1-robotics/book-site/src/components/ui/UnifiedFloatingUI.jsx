import React, { useState, useEffect } from 'react';
import styles from './UnifiedFloatingUI.module.css';

const UnifiedFloatingUI = ({ chatExpanded, setChatExpanded, snowActive, setSnowActive }) => {
  
  const toggleSnow = () => {
    const newState = !snowActive;
    setSnowActive(newState);
    localStorage.setItem('let_it_snow', newState ? '1' : '0');
    window.dispatchEvent(new CustomEvent('snow-toggle', { detail: { active: newState } }));
  };

  const toggleChat = () => {
    setChatExpanded(!chatExpanded);
  };

  return (
    <div className={styles.controlArea}>
      
      {/* Logos Stack (Anti-Gravity) */}
      <div className={`${styles.logoWrapper} ${styles.snowLogoWrapper} ${styles.antiGravity} ${snowActive ? styles.falling : ''}`}>
         {/* Snowflake SVG */}
         <svg 
            className={styles.snowLogo}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
         >
            <path d="M12 2v20 M2 12h20 M4.93 4.93l14.14 14.14 M4.93 19.07l14.14-14.14" />
         </svg>
      </div>

      <div className={`${styles.logoWrapper} ${styles.antiGravity} ${chatExpanded ? styles.logoFalling : ''}`}>
         <img src="/img/app-logo.png" alt="Chat" className={styles.chatLogo} />
      </div>

      {/* Buttons Row */}
      <div className={styles.buttonRow}>
        {/* Chat Widget Button (Right) */}
        <button 
          className={`${styles.glassButton} ${chatExpanded ? styles.active : ''}`}
          onClick={toggleChat}
          aria-label="Open AI Assistant"
        >
          {/* Icon inside button when expanded or logo has fallen */}
          {chatExpanded && <span style={{fontSize: '10px', opacity: 0.6}}>CLOSE</span>}
        </button>

        {/* Snow Effect Button (Left) */}
        <button 
          className={`${styles.glassButton} ${snowActive ? styles.active : ''}`}
          onClick={toggleSnow}
          aria-label="Toggle Snow Effect"
        >
          {snowActive && <span style={{fontSize: '10px', opacity: 0.6, color: '#a5f3fc'}}>STOP</span>}
        </button>
      </div>
      
    </div>
  );
};

export default UnifiedFloatingUI;
