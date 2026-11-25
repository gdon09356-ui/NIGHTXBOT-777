/* ============================================================================
 * UBAID EDITS — SITE CONFIGURATION
 * ----------------------------------------------------------------------------
 * Brand constants + fallback contact details. The live values served to
 * visitors come from the Admin panel (/admin → Profile), which edits the
 * database; the values below are the defaults used before it loads.
 * ========================================================================== */

export const BRAND = {
  name: "UBAID EDITS",
  tagline: "EDIT • CREATE • INSPIRE",
  title: "Video Editor | Motion Graphics Designer | Creative Content Specialist",
} as const;

export const CONTACT = {
  phone: "+92 345 3834605",
  phoneHref: "tel:+923453834605",
  whatsappNumber: "923453834605",
  email: "",
  instagram: "https://instagram.com/ubaidedits",
  youtube: "https://youtube.com/@ubaidedits",
  tiktok: "",
  linkedin: "",
} as const;

/* Workflow — copy lives in the i18n dictionary (workflow.steps). */
export const WORKFLOW_STEPS = ["discover", "strategize", "create", "deliver"] as const;

/* Editable profile shape served by GET /api/profile (partial allowed). */
export type SiteProfile = {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  facebook: string;
  x: string;
  linkedin: string;
  bio1: string;
  bio2: string;
  experienceYears: string;
  projectsDone: string;
  happyClients: string;
  introScript: string;
};
