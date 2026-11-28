"use client";

/* ============================================================================
 * PARTICLE NETWORK BACKGROUND
 * ----------------------------------------------------------------------------
 * Cinematic plexus effect — floating red particles joined by thin connecting
 * lines, drawn on a single <canvas>. Inspired by the reference screenshots
 * (red dots + lines drifting over the dark #0b0d12 base).
 *
 * - Decorative only: aria-hidden + pointer-events-none
 * - Pauses when the tab is hidden or the element scrolls out of view
 * - Renders one static frame when the user prefers reduced motion
 * - Used twice: fixed site-wide layer (layout.tsx) + hero-local overlay
 *   above the background video (hero.tsx)
 * ========================================================================== */

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

const CONNECT_DIST = 130;
const DOT_COLOR = "255, 45, 63"; // --electric #ff2d3f
const LINE_COLOR = "255, 90, 104"; // --glow #ff5a68

export function ParticleBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let dots: Particle[] = [];
    let raf = 0;
    let inView = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density: ~1 particle per 22k px², clamped for mobile / huge screens
      const count = Math.min(90, Math.max(28, Math.floor((w * h) / 22000)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
      }));
    };

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      if (move) {
        for (const p of dots) {
          p.x += p.vx;
          p.y += p.vy;
          // wrap around the edges so the field never thins out
          if (p.x < -12) p.x = w + 12;
          else if (p.x > w + 12) p.x = -12;
          if (p.y < -12) p.y = h + 12;
          else if (p.y > h + 12) p.y = -12;
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = `rgba(${DOT_COLOR}, 0.55)`;
      for (const p of dots) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (inView && !document.hidden) draw(true);
      raf = requestAnimationFrame(tick);
    };

    resize();
    if (reduce) draw(false);
    else raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        resize();
        if (reduce) draw(false);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
