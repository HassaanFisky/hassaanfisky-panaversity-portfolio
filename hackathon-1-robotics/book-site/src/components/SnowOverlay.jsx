// src/components/SnowOverlay.jsx
// HASSAAN AI ARCHITECT — SnowOverlay v3.0
// Physics-based Canvas2D snow with smooth fade in/out.
// Fixed: opacity in useEffect deps caused animation restart loop.
// Fixed: prefersReducedMotion race condition.

import React, { useEffect, useRef, useState, useCallback } from 'react';

const PARTICLE_COUNT = 50;

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 5 + 1,              // depth: 1-6
    radius: Math.random() * 1.5 + 0.5,    // 0.5–2px
    speedY: Math.random() * 0.35 + 0.15,  // slow, realistic
    drift: Math.random() * Math.PI * 2,
    swing: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.4 + 0.35,
  };
}

const SnowOverlay = () => {
  const canvasRef = useRef(null);
  const opacityRef = useRef(0);          // mutable ref — avoids re-render cycle
  const animFrameRef = useRef(null);
  const fadeAnimRef = useRef(null);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const activeRef = useRef(false);

  const [isActive, setIsActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ── INITIALIZATION ────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedState = localStorage.getItem('let_it_snow') === '1';
    if (savedState) {
      setIsActive(true);
      opacityRef.current = 1;
      activeRef.current = true;
    }

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handleMotion = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handleMotion);

    const handleToggle = (e) => {
      cancelAnimationFrame(fadeAnimRef.current);
      if (e.detail.active) {
        setIsActive(true);
        activeRef.current = true;
        const fadeIn = () => {
          const newOp = Math.min(opacityRef.current + 0.04, 1);
          opacityRef.current = newOp;
          if (newOp < 1) {
            fadeAnimRef.current = requestAnimationFrame(fadeIn);
          }
        };
        fadeAnimRef.current = requestAnimationFrame(fadeIn);
      } else {
        const fadeOut = () => {
          const newOp = Math.max(opacityRef.current - 0.035, 0);
          opacityRef.current = newOp;
          if (newOp > 0) {
            fadeAnimRef.current = requestAnimationFrame(fadeOut);
          } else {
            setIsActive(false);
            activeRef.current = false;
            cancelAnimationFrame(animFrameRef.current);
          }
        };
        fadeAnimRef.current = requestAnimationFrame(fadeOut);
      }
    };

    window.addEventListener('snow-toggle', handleToggle);

    return () => {
      mql.removeEventListener('change', handleMotion);
      window.removeEventListener('snow-toggle', handleToggle);
    };
  }, []);

  // ── CANVAS RENDERER ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let running = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { width: w, height: h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const { width, height } = sizeRef.current;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(width, height)
      );
    };

    const render = () => {
      if (!running) return;
      const { width, height } = sizeRef.current;
      const opacity = opacityRef.current;

      ctx.clearRect(0, 0, width, height);

      if (opacity > 0) {
        const time = Date.now() * 0.001;

        for (const p of particlesRef.current) {
          const scale = 1 / p.z;
          p.y += p.speedY * (1 + scale * 0.6);
          p.x += Math.sin(time + p.drift) * scale * p.swing;

          // Wrap-around bounds
          const { width: w, height: h } = sizeRef.current;
          if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
          if (p.x > w + 10) p.x = -10;
          if (p.x < -10) p.x = w + 10;

          const alpha = p.alpha * opacity;
          const r = p.radius * (1 + scale * 0.4);

          ctx.beginPath();
          // Far particles get a soft glow
          if (p.z > 4) {
            ctx.shadowBlur = 2.5;
            ctx.shadowColor = `rgba(255,255,255,${alpha * 0.8})`;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    resize();
    initParticles();
    render();

    window.addEventListener('resize', resize);
    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive, prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  if (!isActive && opacityRef.current === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};

export default SnowOverlay;
