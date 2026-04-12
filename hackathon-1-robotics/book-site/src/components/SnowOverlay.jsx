// src/components/SnowOverlay.jsx
// HASSAAN AI ARCHITECT — SnowOverlay v3.1
// FIX: Canvas render loop now runs independently of isActive state.
// isActive controls particle spawning; opacity controls visibility.
// This ensures fade-out completes properly without particles freezing.

import React, { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 50;

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 5 + 1,
    radius: Math.random() * 1.5 + 0.5,
    speedY: Math.random() * 0.35 + 0.15,
    drift: Math.random() * Math.PI * 2,
    swing: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.4 + 0.35,
  };
}

const SnowOverlay = () => {
  const canvasRef = useRef(null);
  const opacityRef = useRef(0);        // drives fade — never triggers re-render
  const fadeAnimRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ width: 0, height: 0 });

  // isVisible drives canvas mount/unmount (true once snow has ever started)
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ── INITIALIZATION ──────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handleMotion = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handleMotion);

    // Restore persisted snow state
    const savedState = localStorage.getItem('let_it_snow') === '1';
    if (savedState) {
      opacityRef.current = 1;
      setIsVisible(true);
    }

    const handleToggle = (e) => {
      cancelAnimationFrame(fadeAnimRef.current);

      if (e.detail.active) {
        // FADE IN ─ mount canvas first, then animate opacity up
        setIsVisible(true);
        const fadeIn = () => {
          opacityRef.current = Math.min(opacityRef.current + 0.04, 1);
          if (opacityRef.current < 1) {
            fadeAnimRef.current = requestAnimationFrame(fadeIn);
          }
        };
        fadeAnimRef.current = requestAnimationFrame(fadeIn);
      } else {
        // FADE OUT ─ animate opacity to 0, THEN unmount canvas
        const fadeOut = () => {
          opacityRef.current = Math.max(opacityRef.current - 0.035, 0);
          if (opacityRef.current > 0) {
            fadeAnimRef.current = requestAnimationFrame(fadeOut);
          } else {
            // Only unmount after opacity is fully 0
            setIsVisible(false);
          }
        };
        fadeAnimRef.current = requestAnimationFrame(fadeOut);
      }
    };

    window.addEventListener('snow-toggle', handleToggle);

    return () => {
      mql.removeEventListener('change', handleMotion);
      window.removeEventListener('snow-toggle', handleToggle);
      cancelAnimationFrame(fadeAnimRef.current);
    };
  }, []);

  // ── CANVAS RENDERER ─────────────────────────────────────────────────────
  // Keyed to isVisible only — starts when canvas mounts, stops when unmounted
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;
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

      // Always draw if opacity > 0 — this is the key fix.
      // The render loop runs regardless of isActive; opacity alone gates drawing.
      if (opacity > 0) {
        const time = Date.now() * 0.001;

        for (const p of particlesRef.current) {
          const scale = 1 / p.z;
          p.y += p.speedY * (1 + scale * 0.6);
          p.x += Math.sin(time + p.drift) * scale * p.swing;

          const { width: w, height: h } = sizeRef.current;
          if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
          if (p.x > w + 10) p.x = -10;
          if (p.x < -10) p.x = w + 10;

          const alpha = p.alpha * opacity;
          const r = p.radius * (1 + scale * 0.4);

          ctx.beginPath();
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
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

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
