import type { NextConfig } from "next";

/* ============================================================================
 * STATIC EXPORT — the site builds to a fully self-contained package:
 *   index.html + assets/  (ready for GitHub Pages & Vercel, no server).
 * All dynamic data lives in the browser: localStorage + assets/data.json
 * (see src/lib/local-data.ts). The admin panel is a password-gated page.
 * ========================================================================== */
const nextConfig: NextConfig = {
  output: "export",
  /* Allow the sandbox preview origin to fetch /_next assets in dev */
  allowedDevOrigins: ["preview-chat-15b93e2e-03c1-48cc-8fc0-4d4904e7ac6f.space-z.ai"],
  images: {
    /* Static export cannot run the image optimizer — serve files as they are. */
    unoptimized: true,
  },
  reactStrictMode: false,
  /* The dev-tools "N" bubble sits fixed at the bottom-left corner and covers
     the WhatsApp/Call contact dock. Disable it in dev — production unaffected. */
  devIndicators: false,
};

export default nextConfig;
