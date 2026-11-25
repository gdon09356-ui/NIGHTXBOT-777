"use client";

/* ============================================================================
 * INTRO SPLASH — cinematic page-load animation for the landing page.
 * ----------------------------------------------------------------------------
 * A full-screen white curtain with the UBAID EDITS logo, a staggered brand
 * reveal and a red sweep line, then it lifts away. Shown once per browser
 * session (sessionStorage), skipped entirely for reduced-motion users.
 * ========================================================================== */
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const SEEN_KEY = "ue-intro-seen";

export function IntroSplash() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"shown" | "leaving" | "hidden">("shown");

  useEffect(() => {
    const seen = reduce || sessionStorage.getItem(SEEN_KEY);
    if (seen) {
      // Hide instantly (no exit animation) — setState scheduled via a timeout
      // callback so the effect body itself never triggers a cascading render.
      const id = window.setTimeout(() => setPhase("hidden"), 0);
      return () => window.clearTimeout(id);
    }
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setPhase("leaving");
      document.body.style.overflow = "";
      window.setTimeout(() => setPhase("hidden"), 850);
    }, 2000);
    return () => {
      window.clearTimeout(t1);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if ((phase as "shown" | "leaving" | "hidden") === "hidden") return null;

  const name = "UBAID EDITS".split("");
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {phase !== "hidden" ? (
        <motion.div
          key="splash"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0b0d12]"
        >
          {/* thin red frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="pointer-events-none absolute inset-4 rounded-2xl border border-electric/20 sm:inset-6"
          />

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative h-24 w-24 overflow-hidden rounded-3xl border border-line shadow-[0_20px_60px_-18px_rgba(225,29,46,0.55)] sm:h-28 sm:w-28"
          >
            <Image src="/brand/ubaid-edits-logo.jpg" alt="UBAID EDITS" fill sizes="112px" className="object-cover" priority />
          </motion.div>

          {/* staggered brand name */}
          <div className="mt-7 flex overflow-hidden" dir="ltr">
            {name.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.045, duration: 0.55, ease }}
                className="font-display text-2xl font-bold tracking-[0.22em] text-foreground sm:text-3xl"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>

          {/* red sweep line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease }}
            className="mt-4 h-[2px] w-44 origin-center bg-gradient-to-r from-transparent via-electric to-transparent"
          />

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="mt-4 text-[10px] font-bold uppercase tracking-[0.42em] text-muted-foreground"
          >
            EDIT &nbsp;•&nbsp; CREATE &nbsp;•&nbsp; INSPIRE
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
