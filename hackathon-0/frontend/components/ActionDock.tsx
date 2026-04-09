"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Snowflake, MessageSquare, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

/**
 * HASSAAN AI ARCHITECT — ActionDock Node
 * v3.0: High-fidelity dock with Apple Glass aesthetics.
 * Synchronized with SnowOverlay and Dark Mode protocols.
 */
export function ActionDock() {
  const { lang, changeLanguage, t, languages } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const savedSnow = localStorage.getItem("h1_snow_enabled") === "true";
    setIsSnowing(savedSnow);
  }, []);

  const toggleSnow = () => {
    const newState = !isSnowing;
    setIsSnowing(newState);
    localStorage.setItem("h1_snow_enabled", newState.toString());
    
    // Auto-toggle dark mode when snow is enabled (if currently light)
    if (newState && resolvedTheme === "light") {
      setTheme("dark");
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
      icon: <Snowflake size={20} className={isSnowing ? "text-cyan-400 animate-spin-slow" : ""} />, 
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
    <div className={`fixed bottom-10 z-[9999] flex flex-col items-center gap-4 ${lang === 'ur' ? 'left-10' : 'right-10'}`}>
      <AnimatePresence>
        {showLanguage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="flex flex-col gap-2 glass-apple p-2 rounded-2xl shadow-float mb-2"
          >
            {Object.keys(languages).map((l) => (
              <button
                key={l}
                onClick={() => {
                  changeLanguage(l);
                  setShowLanguage(false);
                }}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all uppercase tracking-widest ${
                  lang === l 
                    ? "bg-accent text-white shadow-md scale-105" 
                    : "text-text-secondary hover:bg-bg-base hover:text-accent"
                }`}
              >
                {languages[l].name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 glass-apple p-2.5 rounded-full shadow-float border-white/20 dark:border-white/10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative group ${
              item.active 
                ? "bg-accent text-white shadow-lg" 
                : "text-text-secondary hover:bg-white dark:hover:bg-white/10 hover:text-accent hover:shadow-md"
            }`}
            title={item.label}
          >
            {item.icon}
            <div className={`absolute ${lang === 'ur' ? 'left-full ml-4' : 'right-full mr-4'} px-3 py-1.5 bg-text-primary text-bg-base text-[9px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] font-bold shadow-xl border border-white/10`}>
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

