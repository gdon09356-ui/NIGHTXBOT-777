"use client";

/* ============================================================================
 * UBAID EDITS — landing page.
 * Navbar / Hero / Marquee render eagerly (the cinematic first paint);
 * every section below the fold is code-split and lazy-mounted on approach
 * (see LazySection) so mobile loads fast.
 * ========================================================================== */
import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { LazySection } from "@/components/shared/lazy-section";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { IntroSplash } from "@/components/shared/intro-splash";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { IntroWidget } from "@/components/shared/intro-widget";
import { ContactDock } from "@/components/shared/contact-dock";

const About = dynamic(() => import("@/components/sections/about").then((m) => m.About));
const Services = dynamic(() => import("@/components/sections/services").then((m) => m.Services));
const Portfolio = dynamic(() => import("@/components/sections/portfolio").then((m) => m.Portfolio));
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const Workflow = dynamic(() => import("@/components/sections/workflow").then((m) => m.Workflow));
const Contact = dynamic(() => import("@/components/sections/contact").then((m) => m.Contact));
const Footer = dynamic(() => import("@/components/sections/footer").then((m) => m.Footer));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <IntroSplash />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <IntroWidget />
      <ContactDock />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <LazySection minHeight="80vh">
          <About />
        </LazySection>
        <LazySection minHeight="90vh">
          <Services />
        </LazySection>
        <LazySection minHeight="110vh">
          <Portfolio />
        </LazySection>
        <LazySection minHeight="60vh">
          <Workflow />
        </LazySection>
        <LazySection minHeight="80vh">
          <Testimonials />
        </LazySection>
        <LazySection minHeight="80vh">
          <Contact />
        </LazySection>
      </main>
      <LazySection minHeight="40vh">
        <Footer />
      </LazySection>
    </div>
  );
}
