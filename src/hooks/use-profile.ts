"use client";

/* ============================================================================
 * PROFILE STORE — site profile (phone, WhatsApp, email, socials) from the
 * local data layer (localStorage, seeded from assets/data.json).
 * One shared store for the whole page, hydration-safe.
 * ========================================================================== */

import { useEffect, useSyncExternalStore } from "react";
import { CONTACT, type SiteProfile } from "@/content/site";
import { getProfile, isStoreReady, subscribeLocalData } from "@/lib/local-data";

const FALLBACK: SiteProfile = {
  phone: CONTACT.phone,
  whatsapp: CONTACT.whatsappNumber,
  email: CONTACT.email,
  location: "",
  instagram: CONTACT.instagram,
  youtube: CONTACT.youtube,
  tiktok: CONTACT.tiktok,
  facebook: "",
  x: "",
  linkedin: CONTACT.linkedin,
  bio1: "",
  bio2: "",
  experienceYears: "2",
  projectsDone: "250",
  happyClients: "120",
  introScript: "",
};

const getSnapshot = (): Partial<SiteProfile> | null => (isStoreReady() ? getProfile() : null);
const getServerSnapshot = (): Partial<SiteProfile> | null => null;

export function useProfile() {
  const profile = useSyncExternalStore(subscribeLocalData, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // kick the async data.json fetch on first mount
    isStoreReady();
  }, []);

  /** Server-safe fallback until the store resolves. */
  const value: SiteProfile = { ...FALLBACK, ...(profile ?? {}) };
  return { profile: value, ready: profile !== null };
}
