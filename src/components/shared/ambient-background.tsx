"use client";

/* ============================================================================
 * AMBIENT BACKGROUND — cinematic site-wide atmosphere behind every page.
 * ----------------------------------------------------------------------------
 * Pure CSS (zero JS): two blurred electric-red orbs drifting on long
 * alternating keyframes + a handful of embers rising from the bottom edge,
 * echoing the red smoke of the UBAID EDITS logo. Sits behind the particle
 * network canvas, below all content. Disabled under prefers-reduced-motion.
 * ========================================================================== */

const EMBERS = [
  { left: "4%", dur: 13, delay: 0, dx: "3vw", size: 3 },
  { left: "12%", dur: 17, delay: 3.5, dx: "-4vw", size: 2 },
  { left: "21%", dur: 15, delay: 7, dx: "5vw", size: 4 },
  { left: "30%", dur: 19, delay: 1.5, dx: "-3vw", size: 2 },
  { left: "38%", dur: 14, delay: 9, dx: "4vw", size: 3 },
  { left: "47%", dur: 18, delay: 5.5, dx: "-5vw", size: 2 },
  { left: "55%", dur: 16, delay: 11, dx: "3vw", size: 4 },
  { left: "63%", dur: 20, delay: 2.5, dx: "-3vw", size: 2 },
  { left: "72%", dur: 13.5, delay: 8, dx: "4vw", size: 3 },
  { left: "80%", dur: 17.5, delay: 4.5, dx: "-4vw", size: 2 },
  { left: "88%", dur: 15.5, delay: 6.5, dx: "5vw", size: 3 },
  { left: "95%", dur: 18.5, delay: 10, dx: "-3vw", size: 2 },
];

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-orb orb-a" />
      <div className="ambient-orb orb-b" />
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: e.left,
            width: e.size,
            height: e.size * 1.6,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
            ["--ember-x" as string]: e.dx,
          }}
        />
      ))}
    </div>
  );
}
