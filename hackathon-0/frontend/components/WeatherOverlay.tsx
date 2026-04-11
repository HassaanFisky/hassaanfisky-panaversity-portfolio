"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HASSAAN AI ARCHITECT — Weather Environment Engine v5.0
 * Procedural Audio Synthesis (No external assets).
 * Hardware-accelerated 60 FPS particle systems (GPU composited via will-change).
 */

type WeatherMode = "clear" | "snow" | "rain" | "storm" | "cloudy" | "sunny";

// ─── PROCEDURAL AUDIO ENGINE ────────────────────────────────────────────────
/**
 * Synthesizes ambient weather sounds natively via Web Audio API.
 *
 * Noise types:
 *  - Pink Noise  → 1/f spectrum via Voss-McCartney algorithm. Sounds like rain.
 *  - Brown Noise → Integrated white noise (Brownian motion). Sounds like wind/snow.
 *
 * AudioContext is deferred to the first user interaction to satisfy Apple/Safari
 * autoplay policy (and equivalent Chrome/Firefox restrictions).
 */
function useWeatherAudio(mode: WeatherMode) {
  const audioCtxRef      = useRef<AudioContext | null>(null);
  const gainNodeRef      = useRef<GainNode | null>(null);
  const noiseSourceRef   = useRef<AudioBufferSourceNode | null>(null);
  const filterNodeRef    = useRef<BiquadFilterNode | null>(null);
  const interactedRef    = useRef(false);

  // ── Step 1: Lazy AudioContext init (fires once after first click/touch) ──
  const initAudioCtx = useCallback(() => {
    if (interactedRef.current) return;
    interactedRef.current = true;

    const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!Ctor) return;

    const ctx  = new Ctor() as AudioContext;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    audioCtxRef.current = ctx;
    gainNodeRef.current = gain;
  }, []);

  useEffect(() => {
    window.addEventListener("click",     initAudioCtx, { once: true });
    window.addEventListener("touchstart", initAudioCtx, { once: true });
    return () => {
      window.removeEventListener("click",      initAudioCtx);
      window.removeEventListener("touchstart", initAudioCtx);
    };
  }, [initAudioCtx]);

  // Tear down context on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  // ── Step 2: React to mode changes ──
  useEffect(() => {
    const ctx  = audioCtxRef.current;
    const gain = gainNodeRef.current;
    if (!ctx || !gain) return;

    // Fade out current audio, then swap sources after the fade.
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);

    const swapTimeout = setTimeout(() => {
      // Tear down previous nodes
      if (noiseSourceRef.current) {
        try { noiseSourceRef.current.stop(); } catch (_) {}
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      if (filterNodeRef.current) {
        filterNodeRef.current.disconnect();
        filterNodeRef.current = null;
      }

      if (mode === "clear" || mode === "sunny") return;

      // ── Build noise buffer ──────────────────────────────────────────────
      const SR         = ctx.sampleRate;
      const bufferSize = SR * 3; // 3-second seamless loop
      const buffer     = ctx.createBuffer(1, bufferSize, SR);
      const out        = buffer.getChannelData(0);

      if (mode === "rain" || mode === "storm") {
        // ── Pink Noise: Voss-McCartney algorithm (1/f spectrum) ──────────
        // Perceptually matches rainfall — dense mid-frequency energy.
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
      } else {
        // ── Brown Noise: integrated white noise (Brownian motion) ────────
        // Low-frequency rumble — perceptually matches wind and muffled snow.
        let lastSample = 0;
        for (let i = 0; i < bufferSize; i++) {
          const w   = Math.random() * 2 - 1;
          lastSample = (lastSample + 0.02 * w) / 1.02;
          out[i]     = Math.max(-1, Math.min(1, lastSample * 3.5));
        }
      }

      // ── Biquad filter for spectral shaping ─────────────────────────────
      const filter   = ctx.createBiquadFilter();
      filter.type    = "lowpass";
      // Rain: 1000 Hz — retains the "hiss" of impacting drops.
      // Storm: 600 Hz  — heavier, more menacing.
      // Snow/Cloudy: 300 Hz — deep wind muffle.
      filter.frequency.value =
        mode === "storm" ? 600 :
        mode === "rain"  ? 1000 :
        300;
      filter.Q.value = 0.7; // Butterworth-style rolloff — no ringing

      const source        = ctx.createBufferSource();
      source.buffer       = buffer;
      source.loop         = true;
      source.connect(filter);
      filter.connect(gain);

      // Target volume per mode
      const targetVol =
        mode === "storm"  ? 0.30 :
        mode === "rain"   ? 0.15 :
        mode === "snow"   ? 0.06 :
        0.04; // cloudy

      noiseSourceRef.current = source;
      filterNodeRef.current  = filter;

      source.start();

      // Smooth crossfade in (2-second time constant)
      gain.gain.setTargetAtTime(targetVol, ctx.currentTime, 2.0);
    }, 500); // Wait for fade-out before swapping

    return () => clearTimeout(swapTimeout);
  }, [mode]);
}

// ─── MAIN OVERLAY COMPONENT ──────────────────────────────────────────────────
export function WeatherOverlay() {
  const [mode, setMode] = useState<WeatherMode>("clear");

  useWeatherAudio(mode);

  useEffect(() => {
    const handleWeatherChange = (e: any) => {
      const newMode = (e.detail?.mode ?? "clear") as WeatherMode;
      setMode(newMode);
      document.documentElement.setAttribute("data-weather", newMode);
    };

    window.addEventListener("weather-change", handleWeatherChange);

    const saved = localStorage.getItem("weather_mode") as WeatherMode | null;
    if (saved) {
      setMode(saved);
      document.documentElement.setAttribute("data-weather", saved);
    }

    return () => window.removeEventListener("weather-change", handleWeatherChange);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5000] overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === "snow"   && <SnowEnvironment   key="snow"   />}
        {mode === "rain"   && <RainEnvironment   key="rain"   />}
        {mode === "storm"  && <StormEnvironment  key="storm"  />}
        {mode === "cloudy" && <CloudyEnvironment key="cloudy" />}
        {mode === "sunny"  && <SunnyEnvironment  key="sunny"  />}
      </AnimatePresence>
    </div>
  );
}

// ─── GPU ACCELERATION HELPERS ────────────────────────────────────────────────
// Applied to every animated element so the browser promotes each to its own
// GPU compositor layer — eliminates main-thread paint and achieves true 60 FPS.
const GPU_STYLE: React.CSSProperties = {
  willChange: "transform, opacity",
  transform: "translateZ(0)", // Force layer promotion on Safari
};

// ─── SNOW: Multi-layered Parallax ─────────────────────────────────────────────
function SnowEnvironment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0"
      style={GPU_STYLE}
    >
      {[1, 2, 3].map((layer) => (
        <div key={layer} className={`absolute inset-0 snow-layer-${layer}`}>
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100 + "%" }}
              animate={{
                y: "110vh",
                x: (Math.random() * 100 - 10) + "%",
                rotate: 360,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
              className="absolute text-white/50 pointer-events-none select-none drop-shadow-md"
              style={{
                fontSize: `${5 + Math.random() * 10}px`,
                ...GPU_STYLE,
              }}
            >
              ❄
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

// ─── RAIN: High-frame-rate Streaks & Ripples ──────────────────────────────────
function RainEnvironment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0"
      style={GPU_STYLE}
    >
      {/* Rain Streaks — GPU composited individually */}
      {Array.from({ length: 120 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * 110 + "%" }}
          animate={{ y: "110vh", x: `calc(${Math.random() * 110}% - 20px)` }}
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
          className="rain-streak"
          style={{
            height: `${20 + Math.random() * 40}px`,
            opacity: 0.15 + Math.random() * 0.3,
            ...GPU_STYLE,
          }}
        />
      ))}

      {/* Glass Ripples */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="glass-ripple"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${50 + Math.random() * 50}px`,
            height: `${50 + Math.random() * 50}px`,
            ...GPU_STYLE,
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── STORM: Heavy Rain & Lightning Flashes ────────────────────────────────────
function StormEnvironment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0"
      style={GPU_STYLE}
    >
      <RainEnvironment />
      <div
        className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"
        style={{ ...GPU_STYLE, willChange: "opacity" }}
      />
      {/* Lightning flash — GPU layer so it doesn't trigger a full repaint */}
      <div
        className="storm-flash animate-flash"
        style={{ ...GPU_STYLE, willChange: "opacity" }}
      />
    </motion.div>
  );
}

// ─── CLOUDY: Overcast Volumetric Clouds ──────────────────────────────────────
/**
 * Each cloud blob is a large blurred div animated only via `transform: translateX`
 * (a compositor-only property). No width/height or filter changes during animation
 * means zero layout repaints — the blur is applied once at layer-promotion time.
 */
function CloudyEnvironment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
      className="absolute inset-0 bg-slate-900/20"
      style={{ backdropFilter: "blur(1px)", ...GPU_STYLE }}
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const width  = 600 + Math.random() * 400;
        const height = 300 + Math.random() * 200;
        return (
          <motion.div
            key={i}
            // Animate ONLY translateX — compositor-thread only, no repaint.
            animate={{ x: ["-20%", "120%"] }}
            transition={{
              duration: 40 + Math.random() * 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bg-white/10 rounded-full"
            style={{
              width,
              height,
              top: `${Math.random() * 100}%`,
              left: `${-20 + Math.random() * 40}%`,
              filter: "blur(120px)",  // Applied once at paint time — static.
              ...GPU_STYLE,
            }}
          />
        );
      })}
    </motion.div>
  );
}

// ─── SUNNY: Lens Flares & Golden Hour ─────────────────────────────────────────
function SunnyEnvironment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={GPU_STYLE}
    >
      {/* Golden Hour Bloom */}
      <div className="absolute inset-0 bg-orange-500/10" />

      {/* Dynamic Lens Flare — animates only transform+opacity, no repaints */}
      <motion.div
        animate={{
          scale:   [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3],
          x:       [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,200,100,0.3) 0%, transparent 70%)",
          filter: "blur(10px)",
          ...GPU_STYLE,
        }}
      />

      {/* Flare Orbs */}
      <div
        className="absolute top-[20%] right-[15%] w-24 h-24 bg-white/15 blur-2xl rounded-full"
        style={GPU_STYLE}
      />
      <div
        className="absolute top-[35%] right-[25%] w-12 h-12 bg-white/10 blur-xl rounded-full"
        style={GPU_STYLE}
      />
    </motion.div>
  );
}
