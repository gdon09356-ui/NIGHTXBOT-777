"use client";

/* Infinite specialty ticker — pauses on hover, respects reduced motion. */
import { useLanguage } from "@/i18n/language-context";

export function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="relative border-y border-line/70 bg-surface/40 py-4" aria-hidden="true">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max shrink-0 items-center gap-8 pe-8 group-hover:[animation-play-state:paused] animate-marquee">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-xs font-semibold tracking-[0.3em] text-muted-foreground">{item}</span>
              <span className="h-1 w-1 rounded-full bg-electric" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
