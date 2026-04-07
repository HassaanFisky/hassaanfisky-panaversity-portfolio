"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Snowflake, MessageSquare, BookOpen, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ActionDock() {
  const { lang, changeLanguage, t, languages } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    const savedSnow = localStorage.getItem("h1_snow_enabled") === "true";
    setIsSnowing(savedSnow);
  }, []);

  const toggleSnow = () => {
    const newState = !isSnowing;
    setIsSnowing(newState);
    localStorage.setItem("h1_snow_enabled", newState.toString());
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
    <div className={`fixed bottom-8 z-[9999] flex flex-col items-center gap-3 ${lang === 'ur' ? 'left-8' : 'right-8'}`}>
      <AnimatePresence>
        {showLanguage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="flex flex-col gap-2 bg-[#FAF9F6]/95 backdrop-blur-xl border border-[#E5E0D8] p-2 rounded-2xl shadow-xl mb-2"
          >
            {Object.keys(languages).map((l) => (
              <button
                key={l}
                onClick={() => {
                  changeLanguage(l);
                  setShowLanguage(false);
                }}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${
                  lang === l 
                    ? "bg-[#D97757] text-white shadow-md scale-105" 
                    : "text-[#5C564D] hover:bg-white hover:text-[#D97757]"
                }`}
              >
                {languages[l].name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 bg-[#FAF9F6]/90 backdrop-blur-[18px] border border-[#E5E0D8] p-2 rounded-full shadow-[0_12px_40px_-12px_rgba(45,41,38,0.2)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all relative group ${
              item.active 
                ? "bg-[#D97757] text-white shadow-inner" 
                : "text-[#5C564D] hover:bg-white hover:text-[#D97757] hover:shadow-md"
            }`}
            title={item.label}
          >
            {item.icon}
            <span className="absolute right-full mr-4 px-2 py-1 bg-[#2D2926] text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest font-mono">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
