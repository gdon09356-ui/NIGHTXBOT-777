"use client";

/* Creative workflow — cinematic 4-stage timeline with a progress line that
 * fills as you scroll. Static under reduced motion. */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ClipboardList, Target, Clapperboard, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/i18n/language-context";
import { WORKFLOW_STEPS } from "@/content/site";

const ICONS = [ClipboardList, Target, Clapperboard, Rocket];

export function Workflow() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="workflow" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_60%,rgba(225,29,46,0.06),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading kicker={t.workflow.kicker} heading={t.workflow.heading} subtitle={t.workflow.subtitle} />

        <div ref={trackRef} className="relative mt-16">
          {/* progress spine */}
          <div className="absolute inset-y-4 start-6 w-0.5 bg-line lg:start-1/2 lg:-translate-x-1/2" aria-hidden="true">
            <motion.div
              style={reduce ? { scaleY: 1 } : { scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-electric via-glow to-electric shadow-[0_0_16px_rgba(225,29,46,0.6)]"
            />
          </div>

          <div className="space-y-10">
            {WORKFLOW_STEPS.map((key, i) => {
              const Icon = ICONS[i];
              const step = t.workflow.steps[key];
              const isEven = i % 2 === 0;
              return (
                <Reveal key={key} delay={0.05}>
                  <div className={`group relative flex items-start gap-6 lg:gap-0 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* node */}
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-electric/50 bg-card text-glow shadow-[0_0_24px_rgba(225,29,46,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-electric group-hover:shadow-[0_0_36px_rgba(225,29,46,0.55)] lg:absolute lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2">
                      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                    </span>

                    {/* card */}
                    <div className={`flex-1 lg:w-1/2 ${isEven ? "lg:pe-14 lg:text-end" : "lg:ps-14"}`}>
                      <div className="rounded-2xl border border-line bg-card/60 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/60 hover:bg-surface hover:shadow-[0_24px_60px_-26px_rgba(225,29,46,0.45)] sm:p-6">
                        <p className="font-display text-[11px] font-bold tracking-[0.3em] text-electric transition-transform duration-500 group-hover:translate-x-1">0{i + 1}</p>
                        <h3 className="font-display mt-2 text-lg font-bold uppercase tracking-wide text-foreground transition-colors duration-300 group-hover:text-glow">{step.title}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    {/* spacer for the other half */}
                    <div className="hidden lg:block lg:w-1/2" aria-hidden="true" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
