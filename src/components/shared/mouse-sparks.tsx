"use client";

/* ============================================================================
 * MOUSE SPARKS — ember trail that follows the cursor across the whole site.
 * ----------------------------------------------------------------------------
 * Every mouse move scatters a couple of tiny red/ember sparks that rise and
 * fade like the embers in the UBAID EDITS logo artwork. Drawn on one fixed
 * fullscreen canvas: pointer-events-none, GPU-cheap (2D canvas, <90 sparks),
 * disabled on touch devices and under prefers-reduced-motion, paused while
 * the tab is hidden.
 * ========================================================================== */
import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
  hue: number;
};

export function MouseSparks() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const sparks: Spark[] = [];
    let last = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 24) return; // throttle: max ~40 spawn events / second
      last = now;
      for (let i = 0; i < 2; i++) {
        if (sparks.length > 90) sparks.shift();
        const ang = Math.random() * Math.PI * 2;
        const sp = 0.4 + Math.random() * 1.2;
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: Math.cos(ang) * sp * 0.6,
          vy: Math.sin(ang) * sp * 0.6 - 0.5, // slight upward bias
          life: 0,
          max: 42 + Math.random() * 30,
          r: 1 + Math.random() * 2.2,
          hue: Math.random() < 0.75 ? 353 : 18, // electric red / ember orange
        });
      }
    };

    const tick = () => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.life++;
          s.x += s.vx + Math.sin((s.life + i) * 0.12) * 0.25;
          s.y += s.vy;
          s.vy -= 0.015; // gentle rise, like real embers
          s.vx *= 0.985;
          const t = 1 - s.life / s.max;
          if (t <= 0) {
            sparks.splice(i, 1);
            continue;
          }
          const alpha = t * t * 0.85;
          const r = s.r * (0.5 + t * 0.5) * 3;
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
          g.addColorStop(0, `hsla(${s.hue}, 95%, 62%, ${alpha.toFixed(3)})`);
          g.addColorStop(1, `hsla(${s.hue}, 95%, 55%, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[6] hidden md:block"
    />
  );
}
