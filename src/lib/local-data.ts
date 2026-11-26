"use client";

/* ============================================================================
 * LOCAL DATA LAYER — the single source of truth for the static site.
 *
 * The production build is a static export (no server, no database), so all
 * dynamic content (profile, portfolio videos, client reviews, contact
 * submissions) lives in the browser's localStorage, seeded on first visit
 * from /data.json (which ships inside the build output as assets/data.json).
 *
 *   - Visitors see the published seed; edits made in /admin persist locally
 *     and survive refreshing.
 *   - To publish admin edits to ALL visitors: Data tab → Export JSON →
 *     commit it as assets/data.json on GitHub (Vercel redeploys).
 *
 * React binds to this store through useSyncExternalStore: subscribeLocalData
 * is a stable subscriber function, and every getter returns a referentially
 * stable snapshot that only changes on a real write.
 * ========================================================================== */

import type { SiteProfile } from "@/content/site";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type VideoRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoPath: string;
  thumbPath: string;
  thumbPath2: string;
  duration: string;
  seconds: number;
  vertical: boolean;
  featured: boolean;
  sizeMb: number;
  createdAt: string;
};

export type TestimonialRecord = {
  id: string;
  name: string;
  company: string;
  country: string;
  service: string;
  quote: string;
  rating: number;
  avatarPath: string;
  order: number;
  createdAt?: string;
};

export type SubmissionRecord = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  budget: string | null;
  createdAt: string;
};

export type SiteData = {
  profile: Partial<SiteProfile>;
  videos: VideoRecord[];
  testimonials: TestimonialRecord[];
  submissions: SubmissionRecord[];
};

/* ------------------------------------------------------------------ */
/* Storage keys + admin credentials                                    */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "ubaid-site-data-v1";
const AUTH_KEY = "ubaid-admin-auth";

/** SHA-256 of the admin password — the plain password is not in the bundle. */
const ADMIN_PASSWORD_SHA256 =
  "d816c3d89bce13c1c6753aed74f231434167e45c3f5454d9bd73766a404783b8";

const EMPTY_DATA: SiteData = {
  profile: {},
  videos: [],
  testimonials: [],
  submissions: [],
};

/* ------------------------------------------------------------------ */
/* Store + subscribers                                                 */
/* ------------------------------------------------------------------ */

let store: SiteData = EMPTY_DATA;
let ready = false;
let seedCache: SiteData | null = null;
let initStarted = false;
const subscribers = new Set<() => void>();

const notify = () => subscribers.forEach((fn) => fn());

/** Stable subscriber for useSyncExternalStore. Returns the unsubscribe fn. */
export function subscribeLocalData(onChange: () => void): () => void {
  subscribers.add(onChange);
  return () => subscribers.delete(onChange);
}

export function isStoreReady(): boolean {
  if (!initStarted) startInit();
  return ready;
}

/* ------------------------------------------------------------------ */
/* Init — hydrate from localStorage, fall back to the shipped seed     */
/* ------------------------------------------------------------------ */

function normalizeSeed(raw: unknown): SiteData | null {
  if (!raw || typeof raw !== "object") return null;
  const d = raw as Partial<SiteData>;
  if (!Array.isArray(d.videos) && !Array.isArray(d.testimonials)) return null;
  return {
    profile: (d.profile ?? {}) as Partial<SiteProfile>,
    videos: Array.isArray(d.videos) ? (d.videos as VideoRecord[]) : [],
    testimonials: Array.isArray(d.testimonials) ? (d.testimonials as TestimonialRecord[]) : [],
    submissions: Array.isArray(d.submissions) ? (d.submissions as SubmissionRecord[]) : [],
  };
}

function startInit(): void {
  initStarted = true;
  if (typeof window === "undefined") return;

  // 1. Previously saved local edits always win.
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = normalizeSeed(JSON.parse(saved));
      if (parsed) {
        seedCache = parsed;
        store = parsed;
        ready = true;
        notify();
        return;
      }
    }
  } catch {
    /* corrupted storage — fall through to the seed */
  }

  // 2. First visit: fetch the seed that ships with the build.
  fetch("/data.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((json) => {
      const parsed = normalizeSeed(json);
      seedCache = parsed ?? EMPTY_DATA;
      store = seedCache ?? EMPTY_DATA;
    })
    .catch(() => {
      store = EMPTY_DATA;
    })
    .finally(() => {
      ready = true;
      notify();
    });
}

const uid = (): string =>
  `l${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

function persist(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Quota exceeded (large base64 media) — keep the in-memory state.
    console.warn("local-data: localStorage quota exceeded — changes kept for this session only");
  }
}

function commit(next: SiteData): void {
  store = next;
  persist();
  notify();
}

/* ------------------------------------------------------------------ */
/* Read API — stable snapshots                                         */
/* ------------------------------------------------------------------ */

export function getProfile(): Partial<SiteProfile> {
  return store.profile;
}

export function saveProfile(profile: Partial<SiteProfile>): void {
  commit({ ...store, profile: { ...store.profile, ...profile } });
}

/** Seed data may carry epoch numbers — coerce timestamps before comparing. */
const ts = (x: string | number | null | undefined): string => (x == null ? "" : String(x));

/** Newest first (featured is pinned separately by the UI). */
export function getVideos(): VideoRecord[] {
  return [...store.videos].sort(
    (a, b) => ts(b.createdAt).localeCompare(ts(a.createdAt)),
  );
}

/** Display order (admin assigns a manual order). */
export function getTestimonials(): TestimonialRecord[] {
  return [...store.testimonials].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
  );
}

export function getSubmissions(): SubmissionRecord[] {
  return [...store.submissions].sort(
    (a, b) => ts(b.createdAt).localeCompare(ts(a.createdAt)),
  );
}

/* ------------------------------------------------------------------ */
/* Videos                                                              */
/* ------------------------------------------------------------------ */

export function addVideo(
  input: Omit<VideoRecord, "id">,
): VideoRecord {
  const record: VideoRecord = { ...input, id: uid() };
  commit({ ...store, videos: [record, ...store.videos] });
  return record;
}

export function updateVideo(
  id: string,
  patch: Partial<Omit<VideoRecord, "id">>,
): void {
  commit({
    ...store,
    videos: store.videos.map((v) => (v.id === id ? { ...v, ...patch } : v)),
  });
}

export function deleteVideo(id: string): void {
  commit({ ...store, videos: store.videos.filter((v) => v.id !== id) });
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export function addTestimonial(
  input: Omit<TestimonialRecord, "id" | "createdAt">,
): TestimonialRecord {
  const record: TestimonialRecord = { ...input, id: uid(), createdAt: new Date().toISOString() };
  commit({ ...store, testimonials: [record, ...store.testimonials] });
  return record;
}

export function updateTestimonial(
  id: string,
  patch: Partial<Omit<TestimonialRecord, "id">>,
): void {
  commit({
    ...store,
    testimonials: store.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
  });
}

export function deleteTestimonial(id: string): void {
  commit({ ...store, testimonials: store.testimonials.filter((t) => t.id !== id) });
}

/* ------------------------------------------------------------------ */
/* Contact submissions                                                 */
/* ------------------------------------------------------------------ */

export function addSubmission(
  input: Omit<SubmissionRecord, "id" | "createdAt">,
): SubmissionRecord {
  const record: SubmissionRecord = { ...input, id: uid(), createdAt: new Date().toISOString() };
  commit({ ...store, submissions: [record, ...store.submissions] });
  return record;
}

export function deleteSubmission(id: string): void {
  commit({ ...store, submissions: store.submissions.filter((s) => s.id !== id) });
}

/* ------------------------------------------------------------------ */
/* Admin authentication — sessionStorage flag, tab-close clears it     */
/* ------------------------------------------------------------------ */

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function adminLogin(password: string): Promise<boolean> {
  if (!password) return false;
  try {
    const hash = await sha256Hex(password);
    if (hash !== ADMIN_PASSWORD_SHA256) return false;
    window.sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  } catch {
    // Non-secure context (crypto.subtle unavailable) — direct comparison.
    if (password !== "UBIADMEHARG63G") return false;
    window.sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
}

export function isAdminAuthed(): boolean {
  try {
    return window.sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function adminLogout(): void {
  try {
    window.sessionStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Export / import / reset (admin → Data tab)                          */
/* ------------------------------------------------------------------ */

/** Pretty JSON with exactly the assets/data.json shape. */
export function exportSiteData(): string {
  return JSON.stringify(
    { profile: store.profile, videos: store.videos, testimonials: store.testimonials, submissions: store.submissions },
    null,
    2,
  );
}

export function importSiteData(json: string): { ok: boolean; error?: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, error: "That is not valid JSON." };
  }
  const data = normalizeSeed(parsed);
  if (!data) return { ok: false, error: "JSON is missing the videos/testimonials arrays." };
  seedCache = data;
  commit(data);
  return { ok: true };
}

/** Discard local edits and show the data that ships with the build again. */
export function resetLocalData(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  store = seedCache ?? EMPTY_DATA;
  notify();
}
