/* ============================================================================
 * PORTFOLIO CONTENT
 * ----------------------------------------------------------------------------
 * All public videos now come from the Admin panel (/admin) — the owner
 * uploads real client projects there and they appear here instantly.
 * This file only defines the shared types + category list.
 * ========================================================================== */

import { Locale } from "@/i18n/dictionaries";

export type CategoryId =
  | "meta-ads"
  | "ugc-ads"
  | "restaurant"
  | "motion-graphics"
  | "social-reels";

export type VideoSource =
  | { type: "mp4" | "webm"; src: string }
  | { type: "youtube" | "vimeo"; src: string };

export type Project = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  category: CategoryId;
  thumbnail: string;
  /** Second still (archive hover-switch) — optional */
  thumbnail2?: string;
  video?: VideoSource;
  duration: string;
  vertical?: boolean;
  demo?: boolean;
  featured?: boolean;
};

export const PORTFOLIO_CATEGORIES: (CategoryId | "all")[] = [
  "all",
  "meta-ads",
  "ugc-ads",
  "restaurant",
  "motion-graphics",
  "social-reels",
];

/* Neutral branded thumbnail used when an admin video has none. */
export const FALLBACK_THUMBNAIL = "/media/images/thumb-placeholder.png";
