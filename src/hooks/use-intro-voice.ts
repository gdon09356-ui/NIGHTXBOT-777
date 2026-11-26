"use client";

/* ============================================================================
 * USE INTRO VOICE — shared, language-aware player for the intro voice-over.
 * ----------------------------------------------------------------------------
 * Language choice:
 *   1. If the visitor explicitly picked a site language (stored by the
 *      language switcher) → use the matching voice (ur→Urdu, ar-*→Arabic,
 *      en-GB→English, fr→French, de→German, es→Spanish, tr→Turkish…).
 *   2. Otherwise detect from the browser's preferred languages, so a visitor
 *      from any country hears the intro in their own language.
 * One module-level HTMLAudioElement + a tiny pub/sub so every button on the
 * page (hero CTA, side intro widget, …) shares the same play/pause state.
 *
 * Live captions: the hook also loads the intro script in the SAME language
 * as the voice (English voice → English text, Roman-Urdu voice → Roman Urdu
 * text) from /api/intro-voice-script and maps playback time → the current
 * phrase, so the UI can display word-perfect subtitles while he speaks.
 * ========================================================================== */
import { useCallback, useSyncExternalStore } from "react";

type VoiceLang = "en" | "ur" | "ar" | "fr" | "de" | "es" | "tr" | "zh";
type VoiceState = { playing: boolean; loading: boolean; error: boolean; caption: string };

const SITE_LANG_KEY = "ubaid-locale"; // key used by the language switcher

/** Site locale (or any BCP-47 tag) → the voice language to speak. */
function toVoiceLang(tag: string): VoiceLang | null {
  const base = (tag || "").trim().toLowerCase().split(/[-_]/)[0];
  switch (base) {
    case "ur": case "hi": case "pa": case "sd": return "ur"; // Urdu-speaking region
    case "ar": return "ar";
    case "fr": return "fr";
    case "de": return "de";
    case "es": return "es";
    case "tr": return "tr";
    case "en": return "en";
    case "zh": case "yue": return "zh";
    default: return null;
  }
}

function langFromBrowser(): VoiceLang {
  if (typeof window === "undefined") return "en";
  const langs = window.navigator.languages ?? [window.navigator.language];
  for (const raw of langs) {
    const hit = toVoiceLang(raw);
    if (hit) return hit;
  }
  return "en";
}

function resolveVoiceLang(): VoiceLang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(SITE_LANG_KEY);
    if (stored) {
      const hit = toVoiceLang(stored);
      if (hit) return hit;
    }
  } catch {
    /* ignore */
  }
  return langFromBrowser();
}

let audio: HTMLAudioElement | null = null;
let audioLang: VoiceLang = "en";
let state: VoiceState = { playing: false, loading: false, error: false, caption: "" };
const listeners = new Set<(s: VoiceState) => void>();

function setState(patch: Partial<VoiceState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

/* ---------------- live captions (script in the voice language) ---------------- */

const scriptCache = new Map<VoiceLang, string[]>();
const scriptFetches = new Map<VoiceLang, Promise<void>>();

/** Static build: captions come from the shipped script files (no server). */
function scriptUrl(lang: VoiceLang): string {
  return `/uploads/audio/intro-voice-${lang}.script.txt`;
}

/** Split a script into short, readable caption phrases (sentence-aware). */
function toCaptionLines(script: string): string[] {
  const sentences = script
    .replace(/\s+/g, " ")
    .split(/(?<=[.?!…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  // Merge tiny fragments so captions never flicker word-by-word.
  const lines: string[] = [];
  for (const s of sentences) {
    const last = lines[lines.length - 1];
    if (last && (last.length + s.length) < 96) lines[lines.length - 1] = `${last} ${s}`;
    else lines.push(s);
  }
  return lines.length ? lines : [script];
}

async function ensureScript(lang: VoiceLang): Promise<void> {
  if (scriptCache.has(lang)) return;
  let pending = scriptFetches.get(lang);
  if (!pending) {
    pending = fetch(scriptUrl(lang))
      .then((r) => (r.ok ? r.text() : ""))
      .then((text) => {
        // Files are written as "<voice-name>\n<script>" — drop the header line.
        const lines = text.split(/\r?\n/);
        const script = lines.length > 1 ? lines.slice(1).join(" ") : text;
        if (script.trim()) scriptCache.set(lang, toCaptionLines(script));
      })
      .catch(() => undefined);
    scriptFetches.set(lang, pending);
  }
  await pending;
}

/** Weighted (by phrase length) mapping of playback progress → caption line. */
function captionAt(currentTime: number, duration: number): string {
  const lines = scriptCache.get(audioLang);
  if (!lines || !lines.length || !Number.isFinite(duration) || duration <= 0) return "";
  const weights = lines.map((l) => Math.max(4, l.length));
  const total = weights.reduce((a, b) => a + b, 0);
  const p = Math.min(0.999, Math.max(0, currentTime / duration));
  let acc = 0;
  for (let i = 0; i < lines.length; i++) {
    acc += weights[i] / total;
    if (p < acc) return lines[i];
  }
  return "";
}

/* ---------------- shared audio element ---------------- */

/* Static build: the mastered voice-over files ship inside the package.
 * en / ur have the custom studio recordings, other languages the generated
 * narration — same files the server used to serve via /api/intro-voice. */
const CUSTOM_VOICE_LANGS: VoiceLang[] = ["en", "ur"];

function voiceUrl(lang: VoiceLang): string {
  const suffix = CUSTOM_VOICE_LANGS.includes(lang) ? ".custom" : "";
  return `/uploads/audio/intro-voice-${lang}${suffix}.mp3`;
}

function ensureAudio(lang: VoiceLang): HTMLAudioElement {
  if (audio && audioLang === lang) return audio;
  if (audio) {
    audio.pause();
    audio.src = voiceUrl(lang);
    // listeners stay attached across src swaps
  } else {
    audio = new Audio(voiceUrl(lang));
    audio.preload = "auto";
    audio.onplay = () => setState({ playing: true, loading: false, error: false });
    audio.onpause = () => setState({ playing: false, loading: false });
    audio.onended = () => setState({ playing: false, loading: false, caption: "" });
    audio.onerror = () => setState({ playing: false, loading: false, error: true });
    audio.ontimeupdate = () => {
      if (!state.playing) return;
      const line = captionAt(audio!.currentTime, audio!.duration);
      if (line !== state.caption) setState({ caption: line });
    };
  }
  audioLang = lang;
  return audio;
}

function subscribeVoice(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

const getState = () => state;
const getServerState = () => state;
const getLang = () => resolveVoiceLang();
const getServerLang = (): VoiceLang => "en";

export function useIntroVoice() {
  // Shared external store — no setState-in-effect, hydration-safe.
  const s = useSyncExternalStore(subscribeVoice, getState, getServerState);
  const lang = useSyncExternalStore(subscribeVoice, getLang, getServerLang);

  const toggle = useCallback(async () => {
    const langNow = resolveVoiceLang();
    const a = ensureAudio(langNow);
    void ensureScript(langNow); // load captions in the voice language
    if (state.playing) {
      a.pause();
      setState({ caption: "" });
      return;
    }
    setState({ loading: true, error: false, caption: "" });
    try {
      await a.play(); // resolves when playback actually starts
    } catch {
      setState({ playing: false, loading: false, error: true });
    }
  }, []);

  return { ...s, lang, toggle };
}
