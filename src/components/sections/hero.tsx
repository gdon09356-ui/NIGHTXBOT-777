"use client";

/* ============================================================================
 * HERO — cinematic landing screen.
 * Animations: staggered word-reveal headline, animated stat counters,
 * mouse-parallax portrait with floating craft chips, drifting ambient blob
 * and a shine-sweep CTA. All effects respect prefers-reduced-motion.
 * ========================================================================== */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, BadgeCheck, ChevronDown, Clapperboard, Loader2, Moon, Pause, Play, Volume2, Wand2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-context";
import { useProfile } from "@/hooks/use-profile";
import { useIntroVoice } from "@/hooks/use-intro-voice";
import { ParticleBackground } from "@/components/shared/particle-background";

/** Word-by-word reveal — word level keeps Arabic/Urdu shaping intact. */
function RevealWords({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: delay + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Animated equalizer bars shown in the hero while the intro voice plays. */
function VoiceBars() {
  return (
    <span className="flex h-4 items-center gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-4 w-[3px] origin-bottom rounded-full bg-current animate-eq"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const { profile, ready } = useProfile();
  const reduce = useReducedMotion();
  const { playing: voicePlaying, loading: voiceLoading, caption: voiceCaption, toggle: voiceToggle } = useIntroVoice();
  const sectionRef = useRef<HTMLElement | null>(null);

  /* ---------- ambient background video + cinema controls ---------- */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [bgMounted, setBgMounted] = useState(false);
  const [bgPlaying, setBgPlaying] = useState(true);
  const [cinema, setCinema] = useState(false);

  /* mount the video shortly after first paint — keeps LCP fast */
  useEffect(() => {
    const id = window.setTimeout(() => setBgMounted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  const toggleBg = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => undefined);
      setBgPlaying(true);
    } else {
      v.pause();
      setBgPlaying(false);
    }
  };

  const toggleCinema = () => {
    setCinema((c) => {
      if (!c && videoRef.current) videoRef.current.pause();
      return !c;
    });
  };

  /* Escape exits black-screen mode; freeze page scroll while it is on */
  useEffect(() => {
    if (!cinema) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCinema(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [cinema]);

  /* ---------- mouse parallax (portrait) ---------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 90, damping: 18 });
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 80, damping: 20 });
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [-7, 7]), { stiffness: 80, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const ease = [0.22, 1, 0.36, 1] as const;
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });

  /* Animated counters — count up once the profile fetch lands */
  const years = parseInt(profile.experienceYears, 10) || 2;
  const projects = parseInt(profile.projectsDone, 10) || 250;
  const clients = parseInt(profile.happyClients, 10) || 120;

  const stats = [
    { value: years, suffix: "+", label: t.hero.statYears },
    { value: projects, suffix: "+", label: t.hero.statProjects },
    { value: clients, suffix: "+", label: t.hero.statClients },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="grain relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* background layers */}
      {bgMounted && !cinema ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          src="/media/video/hero-bg.mp4"
          poster="/media/images/ubaid-studio.jpg"
          onPlay={() => setBgPlaying(true)}
          onPause={() => setBgPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity duration-700 dark:opacity-60"
        />
      ) : null}
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      {/* particle network overlay — sits above the video, below the copy */}
      <ParticleBackground className="absolute inset-0 z-[3] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(225,29,46,0.14),transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_15%_80%,rgba(225,29,46,0.08),transparent)]" aria-hidden="true" />
      {/* drifting ambient blob */}
      <div
        className="absolute -end-24 top-1/3 h-80 w-80 rounded-full bg-electric/10 blur-3xl animate-drift"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pe-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pe-14">
        {/* Left — copy */}
        <div className="text-center lg:text-start">
          <motion.div {...rise(0.05)} className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.24em] text-electric">{t.hero.label}</span>
          </motion.div>

          <h1 className="font-display mt-6 text-[2.6rem] font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl xl:text-7xl">
            <RevealWords text={t.hero.line1} delay={0.18} />
            <br />
            <RevealWords
              text={t.hero.line2}
              delay={0.45}
              className="text-glow bg-gradient-to-r from-electric via-glow to-electric bg-clip-text text-transparent"
            />
          </h1>

          <motion.p {...rise(0.28)} className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
            {t.hero.description}
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={() => jump("portfolio")}
              className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_10px_32px_-8px_rgba(225,29,46,0.55)] transition hover:bg-glow hover:shadow-[0_14px_48px_-8px_rgba(255,77,92,0.65)]"
            >
              {t.hero.ctaWork}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => jump("contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-card/70 px-7 py-3.5 text-sm font-bold tracking-wide text-foreground backdrop-blur transition hover:border-electric hover:bg-surface"
            >
              {t.hero.ctaHire}
            </button>
            {/* voice intro — same audio as the side widget, synced state */}
            <button
              onClick={voiceToggle}
              aria-label={voicePlaying ? t.intro.pause : t.hero.listen}
              className={`group inline-flex items-center gap-2.5 rounded-xl border px-6 py-3.5 text-sm font-bold tracking-wide transition ${
                voicePlaying
                  ? "border-electric bg-electric text-white shadow-[0_10px_32px_-8px_rgba(225,29,46,0.55)]"
                  : "border-electric/50 bg-electric/10 text-electric hover:bg-electric hover:text-white"
              }`}
            >
              {voiceLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : voicePlaying ? <VoiceBars /> : <Volume2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{voicePlaying ? t.intro.pause : t.hero.listen}</span>
            </button>
          </motion.div>

          {/* animated stat counters */}
          <motion.div
            {...rise(0.52)}
            className="mx-auto mt-9 grid max-w-md grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-card/60 backdrop-blur lg:mx-0"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-3.5 text-center lg:text-start">
                <p dir="ltr" className="font-display text-xl font-bold leading-none text-foreground sm:text-2xl">
                  {ready ? (
                    <>
                      {s.value}
                      <span className="text-electric">{s.suffix}</span>
                    </>
                  ) : (
                    <span className="inline-block h-7 w-10 rounded bg-surface" />
                  )}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div {...rise(0.62)} className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground lg:justify-start">
            <BadgeCheck className="h-4 w-4 text-glow" />
            {t.hero.available}
          </motion.div>
        </div>

        {/* Right — real portrait with parallax */}
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.1, delay: 0.25, ease } })}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={reduce ? undefined : { perspective: 1000 }}
        >
          {/* offset red frame */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 -rotate-2 rounded-[2rem] border border-electric/25 bg-electric/5 sm:-inset-4"
          />
          <motion.div
            style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-line bg-card shadow-[0_40px_120px_-30px_rgba(225,29,46,0.45)]"
          >
            <motion.div style={reduce ? undefined : { x: imgX, y: imgY }} className="will-change-transform">
              {/* enhanced-quality master (8K-derived, web-sized for fast LCP) */}
              <Image
                src="/media/images/ubaid-studio.jpg"
                alt={t.hero.portraitCaption}
                width={1086}
                height={1448}
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="aspect-[1086/1448] w-full scale-[1.06] object-cover"
              />
            </motion.div>
            {/* bottom caption glass */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl glass px-4 py-3">
              <p className="text-xs font-semibold text-foreground sm:text-[13px]">{t.hero.portraitCaption}</p>
              <span className="h-2 w-2 shrink-0 rounded-full bg-glow animate-pulse-glow" aria-hidden="true" />
            </div>
          </motion.div>

          {/* floating craft chips */}
          <motion.div
            {...(reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.05, duration: 0.7, ease } })}
            className="glass absolute -start-3 top-10 hidden items-center gap-2 rounded-xl px-3 py-2 shadow-lg sm:flex sm:-start-6 animate-float-y"
          >
            <Wand2 className="h-3.5 w-3.5 text-electric" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-foreground">MOTION GRAPHICS</span>
          </motion.div>
          <motion.div
            {...(reduce ? {} : { initial: { opacity: 0, y: -14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.25, duration: 0.7, ease } })}
            className="glass absolute -end-2 bottom-24 hidden items-center gap-2 rounded-xl px-3 py-2 shadow-lg sm:flex sm:-end-5 animate-float-y [animation-delay:1.4s]"
          >
            <Clapperboard className="h-3.5 w-3.5 text-electric" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-foreground">4K COLOR GRADE</span>
          </motion.div>
        </motion.div>
      </div>

      {/* live intro caption — cinematic subtitle, matches the voice language */}
      <AnimatePresence>
        {voicePlaying && voiceCaption ? (
          <motion.div
            key={voiceCaption}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-live="polite"
            className="pointer-events-none absolute bottom-16 start-6 end-6 z-10 mx-auto w-fit max-w-md lg:mx-0 lg:start-10 lg:end-auto"
          >
            <p
              dir="auto"
              className="glass rounded-2xl border border-electric/25 px-5 py-2.5 text-center text-[12.5px] font-medium leading-relaxed text-foreground shadow-[0_18px_50px_-16px_rgba(16,19,26,0.35)] sm:text-[13px]"
            >
              <span className="me-2 inline-block h-1.5 w-1.5 rounded-full bg-electric align-middle animate-pulse-glow" aria-hidden="true" />
              {voiceCaption}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* background video controls */}
      <div className="absolute bottom-6 end-4 z-10 flex items-center gap-2 sm:end-6">
        <button
          onClick={toggleBg}
          aria-label={bgPlaying ? t.hero.bgPause : t.hero.bgPlay}
          title={bgPlaying ? t.hero.bgPause : t.hero.bgPlay}
          className="glass flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted-foreground transition hover:border-electric hover:text-electric"
        >
          {bgPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
        </button>
        <button
          onClick={toggleCinema}
          aria-label={cinema ? t.hero.cinemaExit : t.hero.cinema}
          title={cinema ? t.hero.cinemaExit : t.hero.cinema}
          className="glass flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted-foreground transition hover:border-electric hover:text-electric"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>

      {/* scroll hint */}
      <button
        onClick={() => jump("about")}
        aria-label={t.hero.scrollHint}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition hover:text-foreground"
      >
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </button>

      {/* ================= BLACK SCREEN (cinema mode) ================= */}
      {cinema ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          onClick={toggleCinema}
          aria-hidden="false"
          className="fixed inset-0 z-[90] cursor-pointer bg-black"
        >
          {/* faint red glow so the screen never looks dead */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(225,29,46,0.10),transparent)]" aria-hidden="true" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCinema();
            }}
            aria-label={t.hero.cinemaExit}
            className="absolute bottom-6 end-6 flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-white backdrop-blur transition hover:border-white/60"
          >
            <Moon className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">{t.hero.cinemaExit}</span>
          </button>
        </motion.div>
      ) : null}
    </section>
  );
}
