"use client";

/* ============================================================================
 * TESTIMONIALS — client reviews, grouped by country.
 * Filter chips (All countries / Pakistan / USA / …) let every visitor read
 * reviews from their own region first. Pakistan clients are shown in Roman
 * English/Urdu, other regions in their own language — exactly as collected.
 * Every card: star rating, written review, client photo (DP) and country.
 * Reviews are managed from the Admin panel (→ Reviews).
 * ========================================================================== */
import { useMemo, useState } from "react";
import Image from "next/image";
import { Quote, MapPin, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/i18n/language-context";
import { useTestimonials, type DbTestimonial } from "@/hooks/use-testimonials";
import { cn } from "@/lib/utils";

function Stars({ rating, name }: { rating: number; name: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${rating}/5 — ${name}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-electric text-electric" : "fill-line text-line"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/* DB country strings → dictionary country keys (for localized chip labels). */
type CountryKey = "pk" | "us" | "uk" | "ae" | "om" | "sa" | "fr" | "de" | "es" | "tr";

const COUNTRY_KEY: Record<string, CountryKey> = {
  "pakistan": "pk",
  "united states": "us",
  "usa": "us",
  "united kingdom": "uk",
  "uk": "uk",
  "united arab emirates": "ae",
  "uae": "ae",
  "oman": "om",
  "saudi arabia": "sa",
  "france": "fr",
  "germany": "de",
  "spain": "es",
  "turkey": "tr",
};

function localizedCountry(raw: string, t: ReturnType<typeof useLanguage>["t"]): string {
  const key = COUNTRY_KEY[raw.trim().toLowerCase()];
  if (!key) return raw;
  return t.countries[key];
}

export function Testimonials() {
  const { t } = useLanguage();
  const { testimonials, ready } = useTestimonials();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");

  /* Unique countries in first-appearance order, with per-country counts. */
  const countryChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of testimonials) {
      const key = item.country.trim();
      if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries());
  }, [testimonials]);

  const filtered = useMemo(
    () => (filter === "all" ? testimonials : testimonials.filter((x) => x.country.trim() === filter)),
    [filter, testimonials]
  );

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_20%_40%,rgba(225,29,46,0.07),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker={t.testimonials.kicker}
          heading={t.testimonials.heading}
          subtitle={t.testimonials.subtitle}
        />

        {/* Country filter chips */}
        {countryChips.length > 1 ? (
          <Reveal delay={0.05}>
            <div className="mt-10 flex gap-1.5 overflow-x-auto rounded-2xl border border-line bg-surface/50 p-1.5 no-scrollbar sm:flex-wrap sm:justify-center sm:overflow-visible">
              <button
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold tracking-wider transition sm:text-xs",
                  filter === "all" ? "text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter === "all" ? (
                  <motion.span
                    layoutId="testimonial-pill"
                    className="absolute inset-0 rounded-full bg-electric shadow-[0_0_22px_rgba(225,29,46,0.5)]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{t.testimonials.allCountries}</span>
              </button>
              {countryChips.map(([country, count]) => {
                const active = filter === country;
                return (
                  <button
                    key={country}
                    onClick={() => setFilter(country)}
                    aria-pressed={active}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold tracking-wider transition sm:text-xs",
                      active ? "text-white" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="testimonial-pill"
                        className="absolute inset-0 rounded-full bg-electric shadow-[0_0_22px_rgba(225,29,46,0.5)]"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                      />
                    ) : null}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {localizedCountry(country, t)}
                      <span className="rounded-full bg-black/15 px-1.5 text-[9px] leading-4">{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        {/* Review grid */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item: DbTestimonial, i) => {
              const initials = item.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : Math.min(i * 0.04, 0.3) }}
                >
                  <figure className="group relative flex h-full flex-col rounded-3xl border border-line bg-card/60 p-6 transition duration-500 hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_24px_60px_-28px_rgba(225,29,46,0.4)]">
                    <div className="flex items-center justify-between">
                      <Quote className="h-6 w-6 text-electric/60" aria-hidden="true" />
                      <Stars rating={item.rating} name={item.name} />
                    </div>

                    <blockquote className="mt-4 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      {/* client DP — real photo, fallback to initials */}
                      {item.avatarPath ? (
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-electric/40">
                          <Image
                            src={item.avatarPath}
                            alt={item.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </span>
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-electric/10 font-display text-xs font-bold text-glow">
                          {initials}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{item.company}</p>
                        <p className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                          <MapPin className="h-3 w-3" /> {localizedCountry(item.country, t)}
                        </p>
                      </div>
                      <span className="ms-auto shrink-0 rounded-full border border-line px-2.5 py-1 text-[9px] font-semibold tracking-wider text-muted-foreground">
                        {SERVICE_TAG_LABELS[item.service] ?? item.service}
                      </span>
                    </figcaption>
                  </figure>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {ready && filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line p-12 text-center">
            <Quote className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Client reviews will appear here soon.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* Service tag labels shown on the review cards (brand English). */
const SERVICE_TAG_LABELS: Record<string, string> = {
  "meta-ads": "META ADS & UGC",
  "ugc-ads": "UGC ADS",
  "social-reels": "SOCIAL MEDIA",
  "social-management": "ACCOUNT MANAGEMENT",
  training: "EDITING TRAINING",
  restaurant: "RESTAURANT COMMERCIAL",
  "motion-graphics": "MOTION GRAPHICS",
  "youtube-automation": "YOUTUBE CONTENT",
};
