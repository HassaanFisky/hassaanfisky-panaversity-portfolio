import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HASSAAN AI ARCHITECT — Weather Environment Engine v6.1 (Docusaurus Edition)
 * Cinematic, GPU-accelerated atmospheric environments.
 */

const GPU = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
};

function useWeatherAudio(mode) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const filterNodeRef = useRef(null);
  const interactedRef = useRef(false);

  const initAudioCtx = useCallback(() => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    audioCtxRef.current = ctx;
    gainNodeRef.current = gain;
  }, []);

  useEffect(() => {
    window.addEventListener("click", initAudioCtx, { once: true });
    window.addEventListener("touchstart", initAudioCtx, { once: true });
    return () => {
      window.removeEventListener("click", initAudioCtx);
      window.removeEventListener("touchstart", initAudioCtx);
    };
  }, [initAudioCtx]);

  useEffect(() => {
    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    if (!ctx || !gain) return;

    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);

    const swapTimeout = setTimeout(() => {
      if (noiseSourceRef.current) {
        try { noiseSourceRef.current.stop(); } catch (_) { }
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      if (filterNodeRef.current) {
        filterNodeRef.current.disconnect();
        filterNodeRef.current = null;
      }
      const SR = ctx.sampleRate;
      const bufferSize = SR * 3;
      const buffer = ctx.createBuffer(1, bufferSize, SR);
      const out = buffer.getChannelData(0);

      if (mode === "rain" || mode === "storm") {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const w = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + w * 0.0555179;
          b1 = 0.99332 * b1 + w * 0.0750759;
          b2 = 0.96900 * b2 + w * 0.1538520;
          b3 = 0.86650 * b3 + w * 0.3104856;
          b4 = 0.55000 * b4 + w * 0.5329522;
          b5 = -0.7616 * b5 - w * 0.0168980;
          out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) / 7.0;
          b6 = w * 0.115926;
        }
      } else if (mode === "clear") {
        let s = 0;
        for (let i = 0; i < bufferSize; i++) {
          const w = Math.random() * 2 - 1;
          s = (s + 0.01 * w) / 1.01;
          out[i] = Math.max(-1, Math.min(1, s * 4));
        }
      } else if (mode === "sunny") {
        let s = 0;
        for (let i = 0; i < bufferSize; i++) {
          const w = Math.random() * 2 - 1;
          s = (s + 0.005 * w) / 1.005;
          out[i] = Math.max(-1, Math.min(1, s * 5));
        }
      } else {
        let lastSample = 0;
        for (let i = 0; i < bufferSize; i++) {
          const w = Math.random() * 2 - 1;
          lastSample = (lastSample + 0.02 * w) / 1.02;
          out[i] = Math.max(-1, Math.min(1, lastSample * 3.5));
        }
      }

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value =
        mode === "storm" ? 600 :
          mode === "rain" ? 1000 :
            mode === "sunny" ? 80 :
              mode === "clear" ? 180 : 300;
      filter.Q.value = 0.7;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(filter);
      filter.connect(gain);

      const targetVol =
        mode === "storm" ? 0.30 :
          mode === "rain" ? 0.15 :
            mode === "snow" ? 0.06 :
              mode === "clear" ? 0.04 :
                mode === "sunny" ? 0.035 : 0.04;

      noiseSourceRef.current = source;
      filterNodeRef.current = filter;
      source.start();
      gain.gain.setTargetAtTime(targetVol, ctx.currentTime, 2.0);
    }, 500);

    return () => clearTimeout(swapTimeout);
  }, [mode]);
}

function SnowParticles() {
  const flakes = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 105 - 2.5,
    driftX: Math.random() * 20 - 10,
    size: 5 + Math.random() * 8,
    dur: 10 + Math.random() * 10,
    delay: Math.random() * 10
  })), []);
  return (
    <div className="absolute inset-0">
      {flakes.map(f => (
        <motion.div
           key={f.id}
           initial={{ y: -20, opacity: 0.8 }}
           animate={{ y: "110vh", x: f.driftX, rotate: 360 }}
           transition={{ duration: f.dur, repeat: Infinity, ease: "linear", delay: f.delay }}
           className="absolute text-white/40 pointer-events-none select-none"
           style={{ left: `${f.left}%`, fontSize: `${f.size}px`, ...GPU }}
        >❄</motion.div>
      ))}
    </div>
  );
}

function RainParticles({ storm = false }) {
    const count = storm ? 200 : 120;
    const drops = useMemo(() => Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 110 - 5,
      h: 20 + Math.random() * 30,
      op: 0.15 + Math.random() * 0.3,
      dur: 0.4 + Math.random() * 0.3,
      delay: Math.random() * 2,
      angle: storm ? -15 : -8
    })), [storm, count]);
    return (
      <div className="absolute inset-0">
        {drops.map(d => (
          <motion.div
            key={d.id}
            initial={{ y: "-10vh" }}
            animate={{ y: "110vh" }}
            transition={{ duration: d.dur, repeat: Infinity, ease: "linear", delay: d.delay }}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              width: "1px",
              height: `${d.h}px`,
              background: "linear-gradient(to bottom, transparent, rgba(160,205,255,0.6))",
              opacity: d.op,
              transform: `rotate(${d.angle}deg)`,
              ...GPU
            }}
          />
        ))}
      </div>
    );
}

export function WeatherOverlay() {
  const [mode, setMode] = useState("clear");
  useWeatherAudio(mode);

  useEffect(() => {
    const handleWeatherChange = (e) => {
      const newMode = e.detail?.mode || "clear";
      setMode(newMode);
      document.documentElement.setAttribute("data-weather", newMode);
      localStorage.setItem("weather_mode", newMode);
    };
    window.addEventListener("weather-change", handleWeatherChange);
    const saved = localStorage.getItem("weather_mode");
    if (saved) {
      setMode(saved);
      document.documentElement.setAttribute("data-weather", saved);
    }
    return () => window.removeEventListener("weather-change", handleWeatherChange);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5000] overflow-hidden">
        <AnimatePresence mode="wait">
            {mode === 'snow' && <SnowParticles key="snow" />}
            {mode === 'rain' && <RainParticles key="rain" />}
            {mode === 'storm' && <RainParticles key="storm" storm={true} />}
        </AnimatePresence>
    </div>
  );
}
