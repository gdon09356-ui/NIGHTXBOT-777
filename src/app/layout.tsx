import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/i18n/language-context";
import { ParticleBackground } from "@/components/shared/particle-background";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { MouseSparks } from "@/components/shared/mouse-sparks";
import { BRAND } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://ubaidedits.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.title}`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "UBAID EDITS — professional video editing, motion graphics, Meta & UGC ad creatives, YouTube account management and social media video content. Portfolio served in 10 languages (English, Urdu, Arabic, French, German, Spanish, Turkish). Edit • Create • Inspire.",
  keywords: [
    "video editor",
    "motion graphics designer",
    "UGC ads",
    "Meta ads video",
    "YouTube channel manager",
    "social media account management",
    "social media video content",
    "multilingual video editor",
    "Arabic video editor",
    "Urdu video editor",
    "UBAID EDITS",
  ],
  authors: [{ name: "Ubaid" }],
  creator: "Ubaid",
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Professional video editor & motion graphics designer. Meta ads, YouTube account management and social media video content — portfolio in 10 languages.",
    url: "https://ubaidedits.com",
    siteName: BRAND.name,
    images: [
      {
        url: "/media/images/ubaid-studio.jpg",
        width: 1086,
        height: 1448,
        alt: "UBAID EDITS — Edit • Create • Inspire",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Professional video editing, motion graphics and creative advertising. EN / AR / UR.",
    images: ["/media/images/ubaid-studio.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Self-hosted fonts: preload the latin faces used by the default EN render */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
        {/*
          suppressHydrationWarning: browser extensions (e.g. Bing Visual Search)
          inject attributes like bis_skin_checked="1" into rendered tags, which
          React reports as a hydration mismatch in dev. Our own render tree is
          deterministic — this only silences extension noise on <body>.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          themes={["light", "dark"]}
          disableTransitionOnChange
          storageKey="ubaid-theme"
        >
          {/* cinematic ambience — drifting red orbs + rising embers, site-wide */}
          <AmbientBackground />
          {/* plexus particle network — fixed behind every page */}
          <ParticleBackground className="fixed inset-0 z-0 opacity-70" />
          {/* mouse-follow animation — cursor bloom + ember spark trail everywhere */}
          <CursorGlow />
          <MouseSparks />
          <LanguageProvider>{children}</LanguageProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
