"use client";

/* ============================================================================
 * Language provider — 10 locales (EN/EN-GB/UR/AR-AE/AR-OM/AR-SA/FR/DE/ES/TR).
 * External-store pattern (useSyncExternalStore): no setState-in-effect,
 * hydration-safe (server snapshot = "en"), persists to localStorage.
 * ========================================================================== */

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { DICTS, Dict, Locale } from "@/i18n/dictionaries";

const STORAGE_KEY = "ubaid-locale";

/* ---- tiny external store ---- */
let currentLocale: Locale = "en";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => currentLocale;
const getServerSnapshot = (): Locale => "en";

function setStoreLocale(l: Locale) {
  if (l === currentLocale) return;
  currentLocale = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* storage unavailable — ignore */
  }
  document.documentElement.lang = l;
  document.documentElement.dir = DICTS[l].dir;
  listeners.forEach((fn) => fn());
}

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dict;
  setLocale: (l: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Rehydrate stored preference after mount (syncs the external store,
  // which is the "external system" — no setState involved).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (stored && stored in DICTS && stored !== currentLocale) {
      setStoreLocale(stored as Locale);
    } else {
      document.documentElement.lang = currentLocale;
      document.documentElement.dir = DICTS[currentLocale].dir;
    }
  }, []);

  const setLocale = useCallback((l: Locale) => setStoreLocale(l), []);

  const value: LanguageContextValue = {
    locale,
    dir: DICTS[locale].dir,
    t: DICTS[locale],
    setLocale,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
