"use client";

/* Slim brand-red scroll progress bar pinned to the top of the viewport. */
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left rtl:origin-right bg-gradient-to-r from-electric via-glow to-electric"
    />
  );
}
