"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
type WeatherMode = "clear" | "snow" | "rain" | "storm" | "cloudy";
const CYCLE: WeatherMode[] = ["clear", "snow", "rain", "storm", "cloudy"];
const STORAGE_KEY = "weather_mode";

const ICONS: Record<WeatherMode, string> = { 
  clear: "☀️", 
  snow: "❄️", 
  rain: "🌧️",
  storm: "⚡",
  cloudy: "☁️"
};

const LABELS: Record<WeatherMode, string> = {
  clear: "Clear Sky",
  snow: "Snow Mode",
  rain: "Rain Mode",
  storm: "Storm Mode",
  cloudy: "Cloudy Mode"
};

// ─── Main Component ──────────────────────────────────────────────────────────
export function WeatherToggle() {
  const [mode, setMode] = useState<WeatherMode>("clear");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as WeatherMode;
    if (saved && CYCLE.includes(saved)) {
      setMode(saved);
      document.documentElement.setAttribute("data-weather", saved);
    }
  }, []);

  const toggle = () => {
    const next = CYCLE[(CYCLE.indexOf(mode) + 1) % CYCLE.length];
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-weather", next);
    
    // Compatibility with legacy systems
    window.dispatchEvent(
      new CustomEvent("toggle-snow", { detail: { enabled: next === "snow" } })
    );
  };

  if (!mounted) return null;

  return (
    <>
      <WeatherCanvas mode={mode} />

      {/* Toggle Button */}
      <motion.button
        id="weather-toggle-btn"
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed top-[5.5rem] right-6 z-[10001] w-12 h-12 rounded-full
                   backdrop-blur-md bg-white/10 border border-white/20
                   flex items-center justify-center shadow-lg
                   ring-2 ring-white/20 transition-shadow hover:ring-white/40"
        style={{ backdropFilter: "blur(12px)" }}
        title={LABELS[mode]}
        aria-label={LABELS[mode]}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={mode}
            initial={{ opacity: 0, rotate: -20, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 20, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-lg leading-none select-none"
          >
            {ICONS[mode]}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}

// ─── Weather Canvas Orchestrator ─────────────────────────────────────────────
function WeatherCanvas({ mode }: { mode: WeatherMode }) {
  return (
    <AnimatePresence>
      {mode !== "clear" && (
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
          aria-hidden="true"
        >
          {mode === "snow" && <SnowLayer />}
          {mode === "rain" && <RainLayer />}
          {mode === "storm" && <StormLayer />}
          {mode === "cloudy" && <CloudyLayer />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Layers ──────────────────────────────────────────────────────────────────

function SnowLayer() {
  return (
    <div className="snow-container absolute inset-0">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${(Math.random() * 6).toFixed(2)}s`,
            animationDuration: `${(4 + Math.random() * 5).toFixed(2)}s`,
            opacity: +(0.35 + Math.random() * 0.45).toFixed(2),
            fontSize: `${Math.floor(7 + Math.random() * 10)}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}

function RainLayer() {
  return (
    <div className="rain-container absolute inset-0">
      {Array.from({ length: 45 }).map((_, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: `${Math.random() * 110 - 5}%`,
            animationDelay: `${(Math.random() * 1.2).toFixed(2)}s`,
            animationDuration: `${(0.55 + Math.random() * 0.35).toFixed(2)}s`,
            height: `${Math.floor(14 + Math.random() * 12)}px`,
            opacity: +(0.25 + Math.random() * 0.3).toFixed(2),
          }}
        />
      ))}
    </div>
  );
}

function StormLayer() {
  return (
    <div className="storm-container absolute inset-0 bg-black/5">
      <RainLayer />
      {/* Lightning flash effect */}
      <div className="lightning-flash absolute inset-0 bg-white/10 opacity-0" />
    </div>
  );
}

function CloudyLayer() {
  return (
    <div className="cloudy-container absolute inset-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="cloud-puff absolute bg-white/20 blur-3xl rounded-full"
          style={{
            width: `${200 + Math.random() * 300}px`,
            height: `${100 + Math.random() * 150}px`,
            left: `${-50 + Math.random() * 150}%`,
            top: `${10 + Math.random() * 80}%`,
            animation: `drift ${(20 + Math.random() * 30).toFixed(1)}s linear infinite`,
            animationDelay: `${-(Math.random() * 20).toFixed(1)}s`
          }}
        />
      ))}
    </div>
  );
}
