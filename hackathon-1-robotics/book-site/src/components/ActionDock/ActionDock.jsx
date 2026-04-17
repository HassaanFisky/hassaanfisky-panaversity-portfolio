import React, { useState, useEffect, useRef } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Snowflake, MessageSquare, BookOpen } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.js";
import { useColorMode } from "@docusaurus/theme-common";
import { useCompanion } from "../companion/CompanionContext.jsx";

// Spring preset for dock buttons
const SPRING_ZOOP = { type: "spring", stiffness: 620, damping: 18, mass: 0.8 };

function ActionDockContent() {
  const { lang, changeLanguage, t, languages } = useLanguage();
  const { isOpen: companionOpen, toggle: toggleCompanion } = useCompanion();
  const [showLanguage, setShowLanguage] = useState(false);
  const dockRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguage && languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguage]);

  const WEATHER_MODES = ["clear", "snow", "rain", "storm", "sunny", "cloudy"];
  const [weatherIndex, setWeatherIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("weather_mode") || "clear";
    const idx = WEATHER_MODES.indexOf(saved);
    setWeatherIndex(idx >= 0 ? idx : 0);
  }, []);

  const cycleWeather = () => {
    const nextIdx = (weatherIndex + 1) % WEATHER_MODES.length;
    setWeatherIndex(nextIdx);
    const newMode = WEATHER_MODES[nextIdx];
    window.dispatchEvent(new CustomEvent("weather-change", { detail: { mode: newMode } }));
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
      id: "weather", 
      icon: <Snowflake size={20} className={WEATHER_MODES[weatherIndex] !== 'clear' ? "text-accent animate-spin-slow" : ""} />, 
      label: t.ui.weather || "Weather", 
      action: cycleWeather,
      active: WEATHER_MODES[weatherIndex] !== 'clear' 
    },
    {
      id:             "chat",
      icon:           <MessageSquare size={20} />,
      label:          t.ui.companion,
      action:         toggleCompanion,
      active:         companionOpen,
      isCompanionOrb: true,
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
        {navItems.map((item) => {
          const isOrb   = !!item.isCompanionOrb;
          const isGhost = isOrb && companionOpen;

          return (
            <motion.button
              key={item.id}
              layoutId={isOrb ? "companion-orb" : undefined}
              onClick={item.action}
              whileHover={!isGhost ? { scale: 1.12, y: -3 } : {}}
              whileTap={!isGhost  ? { scale: 0.82 }         : {}}
              transition={SPRING_ZOOP}
              aria-hidden={isGhost ? true : undefined}
              style={{
                width:          "3.5rem",
                height:         "3.5rem",
                borderRadius:   "50%",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                cursor:         isGhost ? "default" : "pointer",
                border:         item.active ? "none" : "0.8px solid transparent",
                background:     item.active ? "var(--accent)" : "transparent",
                color:          item.active ? "white" : "var(--text-secondary)",
                transition:     "background 0.2s, color 0.2s",
                position:       "relative",
                willChange:     "transform, border-radius",
                pointerEvents:  isGhost ? "none" : "auto",
                opacity:        isGhost ? 0 : 1,
              }}
              onMouseOver={(e) => {
                if (!item.active && !isGhost) {
                  e.currentTarget.style.background = "var(--bg-elevated)";
                  e.currentTarget.style.color = "var(--accent)";
                }
              }}
              onMouseOut={(e) => {
                if (!item.active && !isGhost) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
              title={item.label}
              className="dock-btn-group"
            >
              {item.icon}
              {!isGhost && (
                <div
                  style={{
                    position:       "absolute",
                    [lang === "ur" ? "left" : "right"]: "calc(100% + 1rem)",
                    padding:        "0.375rem 0.75rem",
                    background:     "var(--text-primary)",
                    color:          "var(--bg)",
                    fontSize:       "9px",
                    borderRadius:   "0.5rem",
                    opacity:        0,
                    transition:     "opacity 0.2s",
                    whiteSpace:     "nowrap",
                    pointerEvents:  "none",
                    textTransform:  "uppercase",
                    letterSpacing:  "0.2em",
                    fontWeight:     700,
                    boxShadow:      "0 4px 12px rgba(0,0,0,0.12)",
                    border:         "0.8px solid var(--border-fine)",
                  }}
                  aria-hidden="true"
                  className="dock-tooltip"
                >
                  {item.label}
                </div>
              )}
            </motion.button>
          );
        })}
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
