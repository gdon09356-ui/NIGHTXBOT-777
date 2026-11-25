"use client";

import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/i18n/language-context";

/* Consistent kicker + display heading used by every section.
 * Hover: the kicker pill fills with the brand red, the heading gets a
 * shine sweep and the subtitle lifts — matching the review-card hovers. */
export function SectionHeading({
  kicker,
  heading,
  subtitle,
  align = "center",
}: {
  kicker: string;
  heading: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  const { dir } = useLanguage();
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <div className="group">
        {/* block wrapper so the pill and the inline-block heading stack */}
        <div className={centered ? "flex justify-center" : "flex justify-start"}>
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-glow transition-all duration-500 group-hover:border-electric group-hover:bg-electric group-hover:text-white group-hover:shadow-[0_8px_28px_-8px_rgba(225,29,46,0.6)] ${dir === "rtl" ? "tracking-normal" : ""}`}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric animate-pulse-glow transition-colors duration-500 group-hover:bg-white" />
            {kicker}
          </div>
        </div>
        <h2 className="btn-shine font-display mt-5 inline-block w-fit text-3xl font-bold uppercase leading-tight tracking-tight text-foreground transition-colors duration-500 group-hover:text-glow sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        {subtitle ? (
          <p
            className={`mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-base ${centered ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
