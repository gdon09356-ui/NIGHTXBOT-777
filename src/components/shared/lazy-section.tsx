"use client";

/* ============================================================================
 * LAZY SECTION — defers mounting (and chunk download) of below-fold sections
 * until they approach the viewport. Keeps the landing paint fast on mobile.
 * The minHeight placeholder avoids layout shift before the real section mounts.
 * ========================================================================== */
import { useEffect, useRef, useState, type ReactNode } from "react";

export function LazySection({
  children,
  minHeight = "60vh",
}: {
  children: ReactNode;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Very old browsers: mount immediately on the next tick.
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
