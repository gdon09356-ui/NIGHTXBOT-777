"use client";

/* ============================================================================
 * TESTIMONIALS STORE — client reviews from the local data layer (localStorage,
 * seeded from assets/data.json). One shared store for the whole page,
 * hydration-safe. Admin edits in /admin appear here instantly.
 * ========================================================================== */

import { useEffect, useSyncExternalStore } from "react";
import {
  getTestimonials,
  isStoreReady,
  subscribeLocalData,
  type TestimonialRecord,
} from "@/lib/local-data";

export type DbTestimonial = TestimonialRecord;

const getSnapshot = () => isStoreReady() ? getTestimonials() : null;
const getServerSnapshot = (): DbTestimonial[] | null => null;

export function useTestimonials() {
  const testimonials = useSyncExternalStore(subscribeLocalData, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // kick the async data.json fetch on first mount
    isStoreReady();
  }, []);

  return {
    ready: testimonials !== null,
    testimonials: testimonials ?? [],
  };
}

/* Service tag labels shown on the review cards (English — matches the site brand). */
export const SERVICE_TAGS: Record<string, string> = {
  "meta-ads": "META ADS & UGC",
  "ugc-ads": "UGC ADS",
  "social-reels": "SOCIAL MEDIA",
  "social-management": "ACCOUNT MANAGEMENT",
  training: "EDITING TRAINING",
  restaurant: "RESTAURANT COMMERCIAL",
  "motion-graphics": "MOTION GRAPHICS",
  "youtube-automation": "YOUTUBE CONTENT",
};
