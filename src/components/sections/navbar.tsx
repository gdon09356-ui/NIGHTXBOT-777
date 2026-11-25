"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Languages, Menu, X, ArrowUpRight } from "lucide-react";
import { LOCALES } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-context";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "portfolio", key: "portfolio" },
  { id: "testimonials", key: "testimonials" },
  { id: "contact", key: "contact" },
] as const;

export function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const jump = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-line/70 bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(16,19,26,0.25)] dark:bg-[#0b0d12]/85" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6" aria-label="Main">
        {/* Logo */}
        <a href="#home" onClick={(e) => { e.preventDefault(); jump("home"); }} className="group flex items-center gap-2.5">
          <span className="relative block h-10 w-10 overflow-hidden rounded-xl border border-line shadow-[0_4px_14px_-4px_rgba(225,29,46,0.4)] transition group-hover:shadow-[0_6px_20px_-4px_rgba(225,29,46,0.6)]">
            <Image
              src="/brand/ubaid-edits-logo-sm.jpg"
              alt="UBAID EDITS logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.18em] text-foreground sm:text-base">
            UBAID <span className="text-glow">EDITS</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); jump(l.id); }}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / dark mode switch */}
          <ThemeToggle />

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t.common.language}
              className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-2 text-xs font-semibold text-muted-foreground transition hover:border-electric/60 hover:text-foreground"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{LOCALES.find((l) => l.id === locale)?.label}</span>
              <span className="sm:hidden">{LOCALES.find((l) => l.id === locale)?.short}</span>
            </button>
            {langOpen ? (
              <div role="menu" className="glass absolute end-0 top-11 max-h-[70vh] w-60 overflow-y-auto rounded-xl p-1 shadow-2xl">
                {LOCALES.map((l) => (
                  <button
                    key={l.id}
                    role="menuitem"
                    onClick={() => { setLocale(l.id); setLangOpen(false); }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition",
                      locale === l.id ? "bg-electric/10 text-electric" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    )}
                  >
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="truncate font-medium">{l.label}</span>
                      <span className="shrink-0 text-[10px] uppercase tracking-wide opacity-60">{l.country}</span>
                    </span>
                    <span className="shrink-0 text-[9px] uppercase opacity-50">{l.dir}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Hire me */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); jump("contact"); }}
            className="btn-shine hidden items-center gap-1.5 rounded-lg bg-electric px-4 py-2 text-[13px] font-bold tracking-wide text-white shadow-[0_6px_24px_-6px_rgba(225,29,46,0.6)] transition hover:bg-glow hover:shadow-[0_8px_36px_-6px_rgba(255,77,92,0.7)] sm:flex"
          >
            {t.nav.hireMe}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.portfolio.close : "Menu"}
            aria-expanded={open}
            className="rounded-lg border border-line p-2 text-foreground transition hover:border-electric lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-line bg-white/95 backdrop-blur-xl dark:bg-[#0b0d12]/95 lg:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => { e.preventDefault(); jump(l.id); }}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground"
                >
                  {t.nav[l.key]}
                  <ArrowUpRight className="h-4 w-4 opacity-40 rtl:-scale-x-100" />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-2">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); jump("contact"); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-electric px-4 py-3 text-sm font-bold text-white"
              >
                {t.nav.hireMe}
              </a>
              <ThemeToggle className="h-11 w-11 shrink-0" />
            </li>
          </ul>
        </motion.div>
      ) : null}
    </header>
  );
}
