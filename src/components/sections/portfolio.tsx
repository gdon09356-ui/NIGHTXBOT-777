"use client";

/* Cinematic video portfolio — category filters + hover-preview grid + modal. */
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Film } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { VideoPlayerModal } from "@/components/shared/video-player-modal";
import { useLanguage } from "@/i18n/language-context";
import { PORTFOLIO_CATEGORIES, type CategoryId, type Project } from "@/content/projects";
import { useProjects } from "@/hooks/use-projects";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const { t, locale } = useLanguage();
  const { all } = useProjects();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  // Services section can pre-select a category before jumping here
  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail as CategoryId;
      if (PORTFOLIO_CATEGORIES.includes(cat)) setFilter(cat);
    };
    window.addEventListener("ubaid:filter", handler);
    return () => window.removeEventListener("ubaid:filter", handler);
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? all : all.filter((p) => p.category === filter)),
    [filter, all]
  );

  const label = (p: Project) =>
    p.category === "restaurant" ? t.portfolio.categories[p.category] : t.portfolio.categories[p.category];

  const categoryButton = (cat: CategoryId | "all") => {
    const activeCat = filter === cat;
    return (
      <button
        key={cat}
        onClick={() => setFilter(cat)}
        aria-pressed={activeCat}
        className={cn(
          "relative whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold tracking-wider transition sm:text-xs",
          activeCat ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {activeCat ? (
          <motion.span
            layoutId="portfolio-pill"
            className="absolute inset-0 rounded-full bg-electric shadow-[0_0_22px_rgba(225,29,46,0.5)]"
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
          />
        ) : null}
        <span className="relative z-10">{cat === "all" ? t.portfolio.allLabel : t.portfolio.categories[cat]}</span>
      </button>
    );
  };

  return (
    <section id="portfolio" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_50%_0%,rgba(225,29,46,0.07),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker={t.portfolio.kicker}
          heading={t.portfolio.heading}
          subtitle={t.portfolio.subtitle}
        />

        {/* Filters */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex gap-1.5 overflow-x-auto rounded-2xl border border-line bg-surface/50 p-1.5 no-scrollbar sm:flex-wrap sm:justify-center sm:overflow-visible">
            {PORTFOLIO_CATEGORIES.map(categoryButton)}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[11px] leading-relaxed text-muted-foreground/80">
            {t.portfolio.realNotice}
          </p>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : Math.min(i * 0.04, 0.3) }}
              >
                <ProjectCard
                  project={p}
                  categoryLabel={label(p)}
                  onPlay={(proj) => {
                    setActive(proj);
                    setOpen(true);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line p-12 text-center">
            <Film className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">{t.portfolio.empty}</p>
          </div>
        ) : null}
      </div>

      <VideoPlayerModal
        project={
          active
            ? {
                title: active.title[locale],
                description: active.description[locale],
                category: t.portfolio.categories[active.category],
                video: active.video,
                vertical: active.vertical,
                demo: active.demo,
                poster: active.thumbnail,
              }
            : null
        }
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  );
}
