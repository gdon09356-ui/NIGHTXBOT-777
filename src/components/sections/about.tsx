"use client";

import Image from "next/image";
import { Lightbulb, Palette, Handshake } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/i18n/language-context";
import { useProfile } from "@/hooks/use-profile";

export function About() {
  const { t } = useLanguage();
  const { profile } = useProfile();

  // Bio can be overridden from the Admin panel (→ Profile); falls back to the dictionary.
  const paragraphs = [
    profile.bio1 || t.about.paragraphs[0],
    profile.bio2 || t.about.paragraphs[1],
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_30%,rgba(225,29,46,0.07),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t.about.kicker} heading={t.about.heading} />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait — real photo from the editing suite */}
          <Reveal className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
            <div className="group relative overflow-hidden rounded-3xl border border-line">
              <Image
                src="/media/images/ubaid-studio.jpg"
                alt={t.about.portraitCaption}
                width={1086}
                height={1448}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between rounded-xl glass px-4 py-3">
                <p className="text-xs font-semibold text-foreground">{t.about.portraitCaption}</p>
                <span className="h-2 w-2 rounded-full bg-glow animate-pulse-glow" aria-hidden="true" />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              {paragraphs.map((p, i) => (
                <p key={i} className={`text-sm leading-relaxed text-muted-foreground sm:text-base ${i === 0 ? "" : "mt-4"}`}>
                  {p}
                </p>
              ))}
            </Reveal>

            {/* Philosophy / approach */}
            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="group rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/50 hover:bg-surface hover:shadow-[0_20px_50px_-24px_rgba(225,29,46,0.4)]">
                  <Lightbulb className="h-5 w-5 text-glow transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                  <h3 className="font-display mt-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-300 group-hover:text-glow">{t.about.philosophyTitle}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">{t.about.philosophy}</p>
                </div>
                <div className="group rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/50 hover:bg-surface hover:shadow-[0_20px_50px_-24px_rgba(225,29,46,0.4)]">
                  <Handshake className="h-5 w-5 text-glow transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  <h3 className="font-display mt-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-300 group-hover:text-glow">{t.about.approachTitle}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">{t.about.approach}</p>
                </div>
              </div>
            </Reveal>

            {/* Expertise */}
            <Reveal delay={0.15}>
              <div className="mt-8">
                <h3 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                  <Palette className="h-4 w-4 text-glow" /> {t.about.expertiseTitle}
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {t.about.expertise.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:bg-electric/5 hover:text-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric transition-transform duration-300 group-hover:scale-[1.8]" />
                      <span className="transition-transform duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
