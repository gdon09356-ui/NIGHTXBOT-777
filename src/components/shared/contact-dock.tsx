"use client";

/* ============================================================================
 * CONTACT DOCK — floating WhatsApp + Call buttons, always reachable.
 * ----------------------------------------------------------------------------
 * Sits in the bottom-start corner (the intro widget owns the end corner).
 * WhatsApp opens wa.me in a new tab; the Call button dials the profile phone
 * via tel:. Labels expand on hover; everything collapses to circular icons
 * on mobile. Hidden under reduced motion? No — the dock is static, only the
 * hover animation is transition-based so reduced-motion users are fine.
 * ========================================================================== */
import { useState } from "react";
import { Phone } from "lucide-react";
import { BrandWhatsApp } from "@/components/shared/brand-icons";
import { useProfile } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";

export function ContactDock() {
  const { profile, ready } = useProfile();
  const [hovered, setHovered] = useState<"wa" | "call" | null>(null);

  const waHref = profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : "";

  const telHref = (() => {
    const raw = (profile.phone || "").trim();
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) return "";
    if (raw.startsWith("+")) return `tel:+${digits}`;
    if (digits.startsWith("0")) return `tel:+92${digits.slice(1)}`;
    return `tel:+92${digits}`;
  })();

  if (ready && !waHref && !telHref) return null;

  const item =
    "group flex h-12 items-center overflow-hidden rounded-full border shadow-[0_10px_30px_-8px_rgba(16,19,26,0.45)] transition-all duration-300 ease-out";
  const expanded = "w-44 pe-4";
  const collapsed = "w-12 justify-center";

  return (
    <div
      className="fixed bottom-5 start-4 z-40 flex flex-col items-start gap-2.5"
      dir="ltr"
      aria-label="Quick contact — WhatsApp and Call"
    >
      {/* WhatsApp */}
      {waHref ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setHovered("wa")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("wa")}
          onBlur={() => setHovered(null)}
          className={cn(
            item,
            hovered === "wa" ? expanded : collapsed,
            "border-[#25D366]/60 bg-[#25D366] text-white hover:bg-[#1ebe5b] hover:shadow-[0_14px_40px_-8px_rgba(37,211,102,0.65)]"
          )}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <BrandWhatsApp className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </span>
          <span
            className={cn(
              "min-w-0 whitespace-nowrap text-[12px] font-bold uppercase tracking-wider transition-opacity duration-200",
              hovered === "wa" ? "opacity-100" : "opacity-0"
            )}
          >
            WhatsApp
          </span>
        </a>
      ) : null}

      {/* Call */}
      {telHref ? (
        <a
          href={telHref}
          aria-label="Call now"
          onMouseEnter={() => setHovered("call")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("call")}
          onBlur={() => setHovered(null)}
          className={cn(
            item,
            hovered === "call" ? expanded : collapsed,
            "border-electric/60 bg-electric text-white hover:bg-glow hover:shadow-[0_14px_40px_-8px_rgba(225,29,46,0.65)]"
          )}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <Phone className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
          </span>
          <span
            className={cn(
              "min-w-0 whitespace-nowrap text-[12px] font-bold uppercase tracking-wider transition-opacity duration-200",
              hovered === "call" ? "opacity-100" : "opacity-0"
            )}
          >
            Call now
          </span>
        </a>
      ) : null}
    </div>
  );
}
