"use client";

import { GraduationCap } from "lucide-react";
import { BrandMeta, BrandYouTube, BrandInstagram } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/i18n/language-context";
import type { CategoryId } from "@/content/projects";

/* Service → portfolio category mapping (used by "View projects") */
const SERVICE_CATEGORY: CategoryId[] = [
  "meta-ads",
  "social-reels",
  "social-reels",
  "social-reels",
  "meta-ads", // training → meta-ads samples (editing technique demos)
];

/* Official brand marks with their REAL brand colors — index-matched to the
 * services items: Meta Ads, YouTube Automation, Account Management, Social
 * Video Content, Training.
 * Each logo sits on a white app-icon tile (exactly like the official brand
 * app icons) so dark glyphs (TikTok) and gradients (Instagram) always read
 * correctly in both light & dark themes, ringed with the brand's own color. */
const BRANDS: {
  Icon: (props: { className?: string }) => React.ReactNode;
  iconClass: string;
  ring: string;
  shadow: string;
}[] = [
  {
    Icon: BrandMeta,
    iconClass: "h-7 w-7",
    ring: "ring-1 ring-[#0668E1]/35",
    shadow: "shadow-[0_8px_22px_-8px_rgba(6,104,225,0.55)]",
  },
  {
    Icon: BrandYouTube,
    iconClass: "h-7 w-7",
    ring: "ring-1 ring-[#FF0000]/35",
    shadow: "shadow-[0_8px_22px_-8px_rgba(255,0,0,0.5)]",
  },
  {
    Icon: BrandYouTube,
    iconClass: "h-7 w-7",
    ring: "ring-1 ring-[#FF0000]/35",
    shadow: "shadow-[0_8px_22px_-8px_rgba(255,0,0,0.5)]",
  },
  {
    Icon: BrandInstagram,
    iconClass: "h-7 w-7",
    ring: "ring-1 ring-[#D800B9]/35",
    shadow: "shadow-[0_8px_22px_-8px_rgba(216,0,185,0.5)]",
  },
  {
    Icon: GraduationCap,
    iconClass: "h-7 w-7 text-electric",
    ring: "ring-1 ring-electric/35",
    shadow: "shadow-[0_8px_22px_-8px_rgba(225,29,46,0.55)]",
  },
];

/* 5 cards → balanced rows on every screen: 3+2 on desktop (fixes the empty
 * third column / big side gap), 2+2+full on tablets, stacked on mobile. */
const CARD_SPAN = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "sm:col-span-2 lg:col-span-3"];

export function Services() {
  const { t } = useLanguage();

  const viewProjects = (idx: number) => {
    // Jump to portfolio with the related category pre-filtered
    window.dispatchEvent(new CustomEvent("ubaid:filter", { detail: SERVICE_CATEGORY[idx] }));
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_20%,rgba(225,29,46,0.08),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t.services.kicker} heading={t.services.heading} subtitle={t.services.subtitle} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {t.services.items.map((service, i) => {
            const brand = BRANDS[i];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08} className={CARD_SPAN[i] ?? "lg:col-span-2"}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card/60 p-6 transition duration-500 hover:-translate-y-1.5 hover:border-electric/60 hover:shadow-[0_24px_60px_-24px_rgba(225,29,46,0.45)]">
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -end-16 -top-16 h-44 w-44 rounded-full bg-electric/15 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    {/* official app-icon tile — white so every real brand mark reads true */}
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white transition duration-500 group-hover:scale-110 group-hover:-rotate-6 ${brand.ring} ${brand.shadow}`}
                    >
                      <brand.Icon className={brand.iconClass} />
                    </span>
                    <span className="font-display text-3xl font-bold text-line/90 transition duration-500 group-hover:translate-x-1 group-hover:text-electric/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-base font-bold uppercase leading-snug tracking-wide text-foreground transition-colors duration-300 group-hover:text-glow">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition group-hover:border-electric/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => viewProjects(i)}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-wider text-glow transition hover:text-foreground"
                  >
                    {t.services.viewProjects}
                    <span className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
