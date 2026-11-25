"use client";

/* ============================================================================
 * UBAID EDITS — ADMIN PANEL (/admin)
 * Password-locked light CMS with five tabs:
 *   · Videos       — add / edit / delete portfolio videos (products)
 *   · Reviews      — manage the client testimonials shown on the site
 *   · Profile      — phone, WhatsApp, email, socials, About bio
 *   · Messages     — project briefs from the public contact form
 *   · Data         — export / import the JSON that ships with the site
 * Everything published here is stored in localStorage on THIS browser and
 * survives refreshing. To publish changes to every visitor: Data tab →
 * Export JSON → paste into assets/data.json on GitHub → commit.
 * ========================================================================== */

import { useEffect, useState } from "react";
import { Clapperboard, Database, Film, Inbox, Loader2, LogOut, MessageSquareQuote, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LoginScreen } from "./login-screen";
import { VideosTab } from "./videos-tab";
import { TestimonialsTab } from "./testimonials-tab";
import { ProfileTab } from "./profile-tab";
import { MessagesTab } from "./messages-tab";
import { DataTab } from "./data-tab";
import { adminLogout, isAdminAuthed } from "@/lib/local-data";

export default function AdminPage() {
  // sessionStorage is browser-only — start locked, flip after mount.
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setChecked(true);
  }, []);

  const logout = () => {
    adminLogout();
    setAuthed(false);
  };

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-electric" />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-electric/50 bg-electric/10">
              <Clapperboard className="h-5 w-5 text-glow" />
            </span>
            <div>
              <p className="font-display text-sm font-bold tracking-[0.18em] text-foreground">
                UBAID <span className="text-glow">EDITS</span>
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Admin Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/"
              className="rounded-lg border border-line px-3.5 py-2 text-xs font-semibold text-muted-foreground transition hover:border-electric hover:text-foreground"
            >
              View site
            </a>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="mt-6">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1 border border-line bg-surface/50 p-1.5 sm:w-auto">
            <TabsTrigger
              value="videos"
              className="gap-1.5 rounded-lg px-3 py-2 text-xs font-bold data-[state=active]:bg-electric data-[state=active]:text-white"
            >
              <Film className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="gap-1.5 rounded-lg px-3 py-2 text-xs font-bold data-[state=active]:bg-electric data-[state=active]:text-white"
            >
              <MessageSquareQuote className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="gap-1.5 rounded-lg px-3 py-2 text-xs font-bold data-[state=active]:bg-electric data-[state=active]:text-white"
            >
              <UserCog className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="gap-1.5 rounded-lg px-3 py-2 text-xs font-bold data-[state=active]:bg-electric data-[state=active]:text-white"
            >
              <Inbox className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="gap-1.5 rounded-lg px-3 py-2 text-xs font-bold data-[state=active]:bg-electric data-[state=active]:text-white"
            >
              <Database className="h-4 w-4" />
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <VideosTab />
          </TabsContent>
          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsTab />
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="messages" className="mt-6">
            <MessagesTab />
          </TabsContent>
          <TabsContent value="data" className="mt-6">
            <DataTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
