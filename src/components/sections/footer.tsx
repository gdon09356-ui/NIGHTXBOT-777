"use client";

import { Phone, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-context";
import { BRAND } from "@/content/site";
import { useProfile } from "@/hooks/use-profile";
import { BrandInstagram, BrandYouTube, BrandTikTok, BrandFacebook, BrandX, BrandLinkedIn, BrandWhatsApp } from "@/components/shared/brand-icons";
import type { ComponentType } from "react";

export function Footer() {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const linkCls = "text-[13px] text-muted-foreground transition hover:text-electric";

  const telHref = (() => {
    const raw = (profile.phone || "").trim();
    const digits = raw.replace(/[^0-9]/g, "");
    if (raw.startsWith("+")) return `tel:+${digits}`;
    if (digits.startsWith("0")) return `tel:+92${digits.slice(1)}`;
    return digits ? `tel:+92${digits}` : "#";
  })();

  const socials = (
    [
      { href: profile.instagram, Icon: BrandInstagram, label: "Instagram" },
      { href: profile.youtube, Icon: BrandYouTube, label: "YouTube" },
      { href: profile.tiktok, Icon: BrandTikTok, label: "TikTok" },
      { href: profile.facebook, Icon: BrandFacebook, label: "Facebook" },
      { href: profile.x, Icon: BrandX, label: "X" },
      { href: profile.linkedin, Icon: BrandLinkedIn, label: "LinkedIn" },
    ] as { href: string; Icon: ComponentType<{ className?: string }>; label: string }[]
  ).filter((s) => s.href);

  return (
    <footer className="relative mt-auto border-t border-line bg-surface/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-12 w-12 overflow-hidden rounded-xl border border-line bg-[#0b0d12] shadow-[0_4px_14px_-4px_rgba(225,29,46,0.4)]">
                <Image
                  src="/brand/ubaid-logo-sm.jpg"
                  alt="UBAID EDITS logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="font-display text-lg font-bold tracking-[0.16em] text-foreground">
                  UBAID <span className="text-glow">EDITS</span>
                </p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-[0.3em] text-muted-foreground">{BRAND.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">{BRAND.title}</p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted-foreground transition hover:border-electric hover:text-electric"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={t.footer.quickLinks}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground">{t.footer.quickLinks}</p>
            <ul className="mt-4 space-y-2.5">
              {(["home", "about", "services", "portfolio", "testimonials", "contact"] as const).map((key) => (
                <li key={key}>
                  <a href={`#${key}`} onClick={(e) => { e.preventDefault(); jump(key); }} className={linkCls}>
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t.footer.servicesTitle}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground">{t.footer.servicesTitle}</p>
            <ul className="mt-4 space-y-2.5">
              {t.services.items.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); jump("services"); }}
                    className={linkCls}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground">{t.footer.contactTitle}</p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-muted-foreground">
              {profile.phone ? (
                <li>
                  <a href={telHref} className="flex items-center gap-2 transition hover:text-electric" dir="ltr">
                    <Phone className="h-3.5 w-3.5 text-electric" /> {profile.phone}
                  </a>
                </li>
              ) : null}
              {profile.whatsapp ? (
                <li>
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition hover:text-electric"
                    dir="ltr"
                  >
                    <BrandWhatsApp className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </li>
              ) : null}
              {profile.location ? <li className="text-xs leading-relaxed">{profile.location}</li> : null}
            </ul>
            <button
              onClick={() => jump("home")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-xs font-semibold text-muted-foreground transition hover:border-electric hover:text-foreground"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              {t.common.backToTop}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-[11px] text-muted-foreground/70">
            © {year} {BRAND.name}. {t.footer.rights}
          </p>
          {/* Admin panel is intentionally unlinked — the owner opens /admin directly. */}
        </div>
      </div>
    </footer>
  );
}
