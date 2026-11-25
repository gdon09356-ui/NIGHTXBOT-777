"use client";

/* ============================================================================
 * PROJECTS STORE — portfolio videos from the local data layer (localStorage,
 * seeded from assets/data.json). Newest first, featured pinned to the top.
 * Hydration-safe: server snapshot is empty, items appear after mount.
 * ========================================================================== */

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { FALLBACK_THUMBNAIL, type CategoryId, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/dictionaries";
import { getVideos, isStoreReady, subscribeLocalData, type VideoRecord } from "@/lib/local-data";

export type DbVideo = VideoRecord;

const VALID_CATEGORIES: CategoryId[] = [
  "meta-ads",
  "ugc-ads",
  "restaurant",
  "motion-graphics",
  "social-reels",
];

/** Admin titles are language-neutral — repeat the same string for every locale. */
const sameAllLocales = (s: string): Record<Locale, string> => ({
  en: s,
  "en-GB": s,
  ur: s,
  "ar-AE": s,
  "ar-OM": s,
  "ar-SA": s,
  fr: s,
  de: s,
  es: s,
  tr: s,
});

function videoSourceFor(src: string): Project["video"] {
  const lower = src.toLowerCase();
  if (/youtu\.be|youtube\.com/.test(lower)) return { type: "youtube", src };
  if (/vimeo\.com/.test(lower)) return { type: "vimeo", src };
  return { type: lower.endsWith(".webm") ? "webm" : "mp4", src };
}

function toProject(v: DbVideo): Project {
  const category: CategoryId = VALID_CATEGORIES.includes(v.category as CategoryId)
    ? (v.category as CategoryId)
    : "meta-ads";
  return {
    id: `db-${v.id}`,
    title: sameAllLocales(v.title),
    description: sameAllLocales(v.description || ""),
    category,
    thumbnail: v.thumbPath || FALLBACK_THUMBNAIL,
    thumbnail2: v.thumbPath2 || undefined,
    video: v.videoPath ? videoSourceFor(v.videoPath) : undefined,
    duration: v.duration || "",
    vertical: v.vertical,
    demo: false,
    featured: v.featured,
  };
}

/* useSyncExternalStore needs a referentially stable snapshot — cache the
 * mapping keyed on the source array reference (stable between writes). */
let mappedCache: { src: VideoRecord[]; out: Project[] } | null = null;

const getSnapshot = (): Project[] | null => {
  if (!isStoreReady()) return null;
  const src = getVideos();
  if (!mappedCache || mappedCache.src !== src) {
    mappedCache = { src, out: src.map(toProject) };
  }
  return mappedCache.out;
};
const getServerSnapshot = (): Project[] | null => null;

export function useProjects() {
  const dbProjects = useSyncExternalStore(subscribeLocalData, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // kick the async data.json fetch on first mount
    isStoreReady();
  }, []);

  const all = useMemo(() => {
    const list = dbProjects ?? [];
    // Featured pinned to the top, newest first within each group.
    return [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }, [dbProjects]);

  return {
    /** true once the store has loaded (either list shape, even empty) */
    ready: dbProjects !== null,
    dbCount: dbProjects?.length ?? 0,
    all,
  };
}
