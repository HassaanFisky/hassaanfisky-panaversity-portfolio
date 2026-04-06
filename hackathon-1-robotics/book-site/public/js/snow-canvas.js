/**
 * "Genius" Level Snow System
 * Philosophy: Organic, non-linear movement with depth-based rendering.
 * Resembles dust motes in light or distant snow using a high-perf Canvas 2D pipeline.
 */
(function () {
  if (typeof window === "undefined") return;
  if (window.SnowSystem) return;

  const CONFIG = {
    particleCount: 250, // Rich but optimized
    baseSpeedY: 0.3, // Gentle fall
    windBase: 0.2, // Subtle drift
    wobbleSpeed: 0.02,
    flicker: true, // "Diamond dust" effect
  };

  let canvas, ctx;
  let width, height;
  let animationFrameId;
  let isActive = false;

  // Memory aligned buffer:
  // [0:x, 1:y, 2:radius, 3:speedY, 4:driftOffset, 5:opacityBase, 6:flickerPhase]
  const STRIDE = 7;
  const particles = new Float32Array(CONFIG.particleCount * STRIDE);

  function initParticles() {
    for (let i = 0; i < CONFIG.particleCount; i++) {
      resetParticle(i, true);
    }
  }

  function resetParticle(i, randomY = false) {
    const idx = i * STRIDE;
    const depth = Math.pow(Math.random(), 2); // Distribution bias towards "far" particles (more natural)

    // X: Random placement
    particles[idx] = Math.random() * width;
    // Y: Top or random
    particles[idx + 1] = randomY ? Math.random() * height : -20;

    // Visual Properties based on Depth
    // Depth 0 = Far (Small, Slow, Faint) | Depth 1 = Near (Large, Fast, Bright)
    particles[idx + 2] = 0.5 + depth * 2.5; // Radius: 0.5px to 3.0px
    particles[idx + 3] = CONFIG.baseSpeedY + depth * 1.5; // Speed
    particles[idx + 4] = Math.random() * Math.PI * 2; // Drift Offset
    particles[idx + 5] = 0.1 + depth * 0.7; // Base Opacity (0.1 to 0.8)
    particles[idx + 6] = Math.random() * Math.PI; // Flicker phase
  }

  function resize() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // CSS Scaling ensures layout match
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);
  }

  function render() {
    if (!isActive) return;

    ctx.clearRect(0, 0, width, height);

    const time = Date.now() / 1000;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const idx = i * STRIDE;

      // --- PHYSICS ---
      // Gravity
      particles[idx + 1] += particles[idx + 3];

      // Organic Wind (Perlin-like approximation using overlaid sines)
      const windX =
        Math.sin(time + particles[idx + 4]) * 0.3 +
        Math.sin(time * 0.5 + particles[idx + 4]) * 0.1;
      particles[idx] += windX;

      // Wrap/Reset
      if (particles[idx + 1] > height) {
        resetParticle(i, false);
      }
      if (particles[idx] > width) particles[idx] = 0;
      else if (particles[idx] < 0) particles[idx] = width;

      // --- VISUALS ---
      // Flicker calculation: Sine wave modulation of opacity
      let alpha = particles[idx + 5];
      if (CONFIG.flicker) {
        alpha += Math.sin(time * 3 + particles[idx + 6]) * 0.05;
      }
      // Clamp alpha
      if (alpha < 0) alpha = 0;
      if (alpha > 1) alpha = 1;

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.beginPath();
      // Soft Circle
      ctx.arc(
        particles[idx],
        particles[idx + 1],
        particles[idx + 2],
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function setup() {
    canvas = document.getElementById("snow-canvas");
    if (!canvas) return false;

    ctx = canvas.getContext("2d", { alpha: true });
    resize();
    window.addEventListener("resize", resize);
    initParticles();
    return true;
  }

  window.SnowSystem = {
    toggle: (shouldPlay) => {
      if (!canvas) {
        if (!setup() && shouldPlay) return;
      }

      if (shouldPlay) {
        if (!isActive) {
          isActive = true;
          render();
        }
      } else {
        isActive = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (ctx) ctx.clearRect(0, 0, width, height);
      }
    },
  };
})();
