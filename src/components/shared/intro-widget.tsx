"use client";

/* ============================================================================
 * INTRO WIDGET — the floating "who am I" card.
 * ----------------------------------------------------------------------------
 * When a client lands on the site, Ubaid personally introduces himself:
 * a greeting bubble pops out after a few seconds, the card shows who he is,
 * how many years of experience he has (live from the Admin profile) and can
 * play his recorded intro voice (TTS served by /api/intro-voice).
 *
 * Desktop (md+): a bubble pinned to the right edge, vertically centered,
 *                expanding into a card beside it.
 * Mobile:        a bubble above the bottom-right corner, expanding into a
 *                bottom sheet card.
 * ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Loader2, Play, X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-context";
import { useProfile } from "@/hooks/use-profile";
import { useIntroVoice } from "@/hooks/use-intro-voice";

/** Animated equalizer bars shown while the intro voice plays. */
function Equalizer() {
  return (
    <span className="flex h-4 items-center gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-4 w-[3px] origin-bottom rounded-full bg-white animate-eq"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}

/** Count-up number that animates when the card opens. */
function CountUp({ value, active }: { value: number; active: boolean }) {
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, value]);
  return <>{active ? n : value}</>;
}

/** The shared bubble button (avatar + pulsing rings + voice badge). */
function AvatarBubble({ onOpen, label }: { onOpen: () => void; label: string }) {
  return (
    <button onClick={onOpen} aria-label={label} className="group relative block h-16 w-16">
      <span className="absolute inset-0 rounded-full border-2 border-electric/50 animate-ring-pulse" aria-hidden="true" />
      <span className="absolute -inset-1.5 rounded-full bg-electric/10 blur-md animate-pulse-glow" aria-hidden="true" />
      <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-white shadow-[0_8px_30px_-6px_rgba(225,29,46,0.65)] transition group-hover:scale-105">
        <Image src="/media/images/ubaid-real-enhanced.jpg" alt="Ubaid" fill sizes="64px" className="object-cover" />
      </span>
      <span className="absolute -bottom-1 -end-1 flex h-6 w-6 items-center justify-center rounded-full bg-electric text-white shadow-md">
        <Play className="h-3 w-3 fill-current" />
      </span>
    </button>
  );
}

/** The full intro card (shared between desktop and mobile shells). */
function IntroCard({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { profile, ready } = useProfile();
  const reduce = useReducedMotion();
  /* shared player — stays in sync with the hero voice button */
  const { playing, loading: loadingVoice, error: voiceError, caption, toggle: toggleVoice } = useIntroVoice();

  const years = parseInt(profile.experienceYears, 10) || 2;
  const projects = parseInt(profile.projectsDone, 10) || 250;
  const clients = parseInt(profile.happyClients, 10) || 120;

  const jump = (id: string) => {
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div dir="auto" className="relative w-[320px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-3xl border border-line bg-white/95 shadow-[0_30px_90px_-20px_rgba(16,19,26,0.4)] backdrop-blur-xl dark:bg-[#12151c]/95 dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)]">
      {/* header banner */}
      <div className="relative h-24 bg-gradient-to-br from-electric via-glow to-electric">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_40%,white_1px,transparent_1px)] [background-size:14px_14px]" aria-hidden="true" />
        <button
          onClick={onClose}
          aria-label={t.portfolio.close}
          className="absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white transition hover:bg-black/35"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* avatar overlapping the banner */}
      <div className="relative -mt-10 px-5">
        <span className="block h-20 w-20 overflow-hidden rounded-2xl border-4 border-white shadow-[0_10px_30px_-10px_rgba(225,29,46,0.55)] dark:border-[#1c2028]">
          <Image src="/media/images/ubaid-real-enhanced.jpg" alt="Ubaid" width={160} height={160} className="h-full w-full object-cover" />
        </span>
        <p className="font-display mt-3 text-lg font-bold leading-none text-foreground">{t.intro.title}</p>
        <p className="mt-1.5 text-[12px] font-semibold text-electric">{t.intro.subtitle}</p>
      </div>

      {/* stats — animated when opened */}
      <div className="mt-4 grid grid-cols-3 gap-2 px-5">
        {[
          { v: years, label: t.intro.years, suffix: "+" },
          { v: projects, label: t.intro.projects, suffix: "+" },
          { v: clients, label: t.intro.clients, suffix: "+" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-surface/60 px-2 py-2.5 text-center">
            <p dir="ltr" className="font-display text-lg font-bold leading-none text-foreground">
              <CountUp value={s.v} active={ready} />
              <span className="text-electric">{s.suffix}</span>
            </p>
            <p className="mt-1 text-[9.5px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* blurb */}
      <p className="mt-4 px-5 text-[12.5px] leading-relaxed text-muted-foreground">{t.intro.blurb}</p>

      {/* voice play button */}
      <div className="mt-4 px-5">
        <button
          onClick={toggleVoice}
          aria-label={playing ? t.intro.pause : t.intro.play}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-electric py-3 text-[13px] font-bold tracking-wide text-white shadow-[0_10px_30px_-8px_rgba(225,29,46,0.6)] transition hover:bg-glow"
        >
          {loadingVoice ? <Loader2 className="h-4 w-4 animate-spin" /> : playing ? <Equalizer /> : <Play className="h-4 w-4 fill-current" />}
          {loadingVoice ? t.intro.loading : playing ? t.intro.pause : t.intro.play}
        </button>
        {voiceError ? <p className="mt-2 text-center text-[11px] font-medium text-destructive">{t.intro.voiceError}</p> : null}

        {/* live caption — the intro text in the language the voice speaks
            (English voice → English text, Roman-Urdu voice → Roman Urdu) */}
        <div className="mt-3" aria-live="polite">
          <AnimatePresence initial={false}>
            {playing && caption ? (
              <motion.div
                key={caption}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative flex min-h-[4.25rem] items-center rounded-xl border border-electric/25 bg-electric/5 px-3.5 py-2"
              >
                <p dir="auto" className="text-[12.5px] font-medium leading-relaxed text-foreground">
                  <span className="me-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-electric align-middle animate-pulse-glow" aria-hidden="true" />
                  {caption}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* hire CTA */}
      <div className="mt-2.5 px-5 pb-5">
        <button
          onClick={() => jump("contact")}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-electric/50 bg-electric/5 py-3 text-[13px] font-bold tracking-wide text-electric transition hover:bg-electric hover:text-white"
        >
          {t.intro.hire}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </button>
      </div>
    </div>
  );
}

/** The shared greeting bubble (declared outside render — lint: static components). */
function GreetingBubble({
  visible,
  className,
  onOpen,
  onDismiss,
  label,
  playLabel,
}: {
  visible: boolean;
  className: string;
  onOpen: () => void;
  onDismiss: () => void;
  label: string;
  playLabel: string;
}) {
  if (!visible) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      dir="auto"
      className={`glass absolute z-10 w-56 rounded-2xl p-3.5 text-start shadow-[0_18px_50px_-16px_rgba(16,19,26,0.35)] ${className}`}
    >
      <span className="block text-[12px] font-semibold leading-snug text-foreground">{label}</span>
      <span className="mt-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-electric">
        <Play className="h-2.5 w-2.5 fill-current" />
        {playLabel}
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        aria-label={playLabel}
        className="absolute -top-2 -start-2 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-white text-muted-foreground shadow-sm transition hover:text-foreground dark:bg-[#12151c]"
      >
        <X className="h-3 w-3" />
      </span>
    </motion.button>
  );
}

export function IntroWidget() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);

  /* Greeting bubble pops out shortly after the visitor lands */
  useEffect(() => {
    if (reduce) return;
    const show = window.setTimeout(() => setBubble(true), 2600);
    return () => window.clearTimeout(show);
  }, [reduce]);

  const openCard = () => {
    setOpen(true);
    setBubble(false);
  };

  const bubbleProps = {
    visible: bubble,
    onOpen: openCard,
    onDismiss: () => setBubble(false),
    label: t.intro.greeting,
    playLabel: t.intro.play,
  };

  return (
    <>
      {/* ================= Desktop — right edge, vertically centered ================= */}
      <div className="pointer-events-none fixed inset-y-0 end-0 z-[45] hidden md:block">
        {/* collapsed bubble + greeting */}
        <motion.div
          className="pointer-events-auto absolute end-5 top-1/2 -translate-y-1/2"
          animate={open ? { opacity: 0, scale: 0.6, transition: { duration: 0.15 } } : { opacity: 1, scale: 1 }}
          style={{ visibility: open ? "hidden" : "visible" }}
        >
          <AvatarBubble onOpen={openCard} label={t.intro.title} />
          <AnimatePresence>
            <GreetingBubble {...bubbleProps} className="end-[4.75rem] top-1/2 -translate-y-1/2 rounded-e-sm" />
          </AnimatePresence>
        </motion.div>

        {/* expanded card */}
        <AnimatePresence>
          {open ? (
            <motion.aside
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto absolute end-4 top-1/2 -translate-y-1/2"
            >
              <IntroCard onClose={() => setOpen(false)} />
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ================= Mobile — bottom-right bubble / bottom sheet ================= */}
      <div className="pointer-events-none fixed bottom-24 end-3 z-[45] md:hidden">
        <motion.div
          className="pointer-events-auto relative"
          animate={open ? { opacity: 0, scale: 0.6, transition: { duration: 0.15 } } : { opacity: 1, scale: 1 }}
          style={{ visibility: open ? "hidden" : "visible" }}
        >
          <AvatarBubble onOpen={openCard} label={t.intro.title} />
          <AnimatePresence>
            <GreetingBubble {...bubbleProps} className="bottom-2 end-[4.25rem] origin-bottom-right rounded-br-sm" />
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {open ? (
            <motion.aside
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto fixed inset-x-3 bottom-3 z-[46] mx-auto"
            >
              <IntroCard onClose={() => setOpen(false)} />
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
