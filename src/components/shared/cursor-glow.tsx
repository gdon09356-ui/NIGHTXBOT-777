"use client";

/* ============================================================================
 * CURSOR GLOW — cinematic mouse-follow ambience for the landing page.
 * A soft electric-blue bloom trails the cursor (spring-smoothed), plus a
 * fine glow dot. Hidden on touch devices and under prefers-reduced-motion.
 * GPU-only work (transform/opacity) — zero layout thrash.
 * ========================================================================== */
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });
  const dx = useSpring(x, { stiffness: 700, damping: 40 });
  const dy = useSpring(y, { stiffness: 700, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // Enable on the next tick (avoids synchronous setState in the effect body).
    const t = window.setTimeout(() => setEnabled(true), 0);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
    };
  }, [x, y]);

  if (reduce || !enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] hidden md:block">
      {/* trailing bloom */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.16),transparent_65%)] blur-2xl will-change-transform"
      />
      {/* fine dot */}
      <motion.div
        style={{ x: dx, y: dy }}
        className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full border border-glow/60 bg-glow/25 shadow-[0_0_14px_rgba(255,77,92,0.7)] will-change-transform"
      />
    </div>
  );
}
