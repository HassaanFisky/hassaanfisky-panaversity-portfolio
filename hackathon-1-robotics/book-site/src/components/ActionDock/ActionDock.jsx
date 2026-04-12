import React, { useState, useEffect, useRef } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { Languages, Snowflake, MessageSquare, BookOpen } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useColorMode } from "@docusaurus/theme-common";

function ActionDockContent() {
  const { lang, changeLanguage, t, languages } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);
  const { colorMode, setColorMode } = useColorMode();
  
  const dockRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const savedSnow = localStorage.getItem("h1_snow_enabled") === "true";
    setIsSnowing(savedSnow);

    const handleClickOutside = (event) => {
      if (showLanguage && languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguage]);

  const toggleSnow = () => {
    const newState = !isSnowing;
    setIsSnowing(newState);
    localStorage.setItem("h1_snow_enabled", newState.toString());
    
    if (newState && colorMode === "light") {
      setColorMode("dark");
    }
    
    window.dispatchEvent(new CustomEvent("toggle-snow", { detail: { enabled: newState } }));
  };

  const navItems = [
    { 
      id: "lang", 
      icon: <Languages size={20} />, 
      label: t.ui.language, 
      action: () => setShowLanguage(!showLanguage),
      active: showLanguage 
    },
    { 
      id: "snow", 
      icon: <Snowflake size={20} className={isSnowing ? "text-accent animate-spin-slow" : ""} />, 
      label: t.ui.snow, 
      action: toggleSnow,
      active: isSnowing 
    },
    { 
      id: "chat", 
      icon: <MessageSquare size={20} />, 
      label: t.ui.companion, 
      action: () => window.dispatchEvent(new CustomEvent("toggle-chat")),
      active: false 
    },
    { 
      id: "notebook", 
      icon: <BookOpen size={20} />, 
      label: t.ui.notebook, 
      action: () => window.dispatchEvent(new CustomEvent("toggle-notebook")),
      active: false 
    }
  ];

  return (
    <div ref={dockRef} className={`fixed bottom-10 z-[9999] flex flex-col items-center gap-4 ${lang === 'ur' ? 'left-10' : 'right-10'}`}>
      {showLanguage && (
        <div
          ref={languageRef}
          className="flex flex-col gap-2 humanist-glass p-2 rounded-2xl mb-2"
        >
          {Object.keys(languages).map((l) => (
            <button
              key={l}
              onClick={() => {
                changeLanguage(l);
                setShowLanguage(false);
              }}
              style={{
                background: lang === l ? 'var(--accent)' : 'transparent',
                color: lang === l ? 'white' : 'var(--text-secondary)',
                padding: '0.6rem 1.25rem',
                borderRadius: '0.75rem',
                fontSize: '11px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (lang !== l) e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseOut={(e) => {
                if (lang !== l) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {languages[l].name}
            </button>
          ))}
        </div>
      )}

      <div 
        className="flex flex-col gap-3 humanist-glass p-2.5 rounded-full shadow-glow"
        style={{
          border: '0.8px solid var(--border-fine)'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative group ${
              item.active 
                ? "bg-accent text-white shadow-lg" 
                : "bg-transparent text-text-secondary hover:bg-bg-elevated hover:text-accent hover:shadow-md"
            }`}
            style={{ 
              border: item.active ? 'none' : '0.8px solid transparent',
              cursor: 'pointer',
              background: item.active ? 'var(--accent)' : 'transparent'
            }}
            title={item.label}
          >
            {item.icon}
            <div 
              className={`absolute ${lang === 'ur' ? 'left-full ml-4' : 'right-full mr-4'} px-3 py-1.5 bg-text-primary text-bg-base text-[9px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] font-bold shadow-xl`}
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg)',
                border: '0.8px solid var(--border-fine)'
              }}
            >
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ActionDock() {
  return (
    <BrowserOnly>
      {() => <ActionDockContent />}
    </BrowserOnly>
  );
}
