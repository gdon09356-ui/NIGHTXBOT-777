"use client";

/* ============================================================================
 * ADMIN → PROFILE TAB — edit the site profile: phone, WhatsApp, email,
 * location, social links and the About bio. Saved to localStorage — the
 * public site shows these details instantly in this browser. Publish to
 * every visitor via the Data tab (Export JSON → GitHub assets/data.json).
 * ========================================================================== */

import { useEffect, useState } from "react";
import { Loader2, Save, UserCog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getProfile, saveProfile } from "@/lib/local-data";

type ProfileForm = {
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

const EMPTY: ProfileForm = {
  phone: "",
  whatsapp: "",
  email: "",
  location: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  facebook: "",
  x: "",
  linkedin: "",
  bio1: "",
  bio2: "",
  experienceYears: "5",
  projectsDone: "250",
  happyClients: "120",
  introScript: "",
};

export function ProfileTab() {
  const { toast } = useToast();
  const [form, setForm] = useState<ProfileForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      setForm({ ...EMPTY, ...getProfile() });
    } catch {
      toast({ title: "Could not load profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      saveProfile(form);
      toast({ title: "Profile saved", description: "The site on this browser now shows these details." });
    } finally {
      setSaving(false);
    }
  };

  const set = (key: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-electric" />
      </div>
    );
  }

  return (
    <form onSubmit={save} className="rounded-3xl border border-line bg-card/60 p-5 sm:p-8" aria-label="Edit profile">
      <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
        <UserCog className="h-4 w-4 text-glow" />
        Site profile
      </h2>
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
        These details appear in the Contact section and the footer. WhatsApp must be in international
        format — e.g. <code className="text-[#e11d2e]">923453834605</code>. Saved in this browser —
        publish to every visitor from the <span className="font-bold text-foreground">Data</span> tab.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="p-phone">Phone (shown on the site)</Label>
          <Input id="p-phone" value={form.phone} onChange={set("phone")} dir="ltr" placeholder="+92 345 3834605" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-whatsapp">WhatsApp (digits only)</Label>
          <Input id="p-whatsapp" value={form.whatsapp} onChange={set("whatsapp")} dir="ltr" placeholder="923453834605" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-email">Email (leave empty to hide)</Label>
          <Input id="p-email" type="email" value={form.email} onChange={set("email")} dir="ltr" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-location">Location line</Label>
          <Input id="p-location" value={form.location} onChange={set("location")} placeholder="Pakistan — working with clients worldwide" />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Social links (empty = hidden)</p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-instagram">Instagram URL</Label>
          <Input id="p-instagram" value={form.instagram} onChange={set("instagram")} dir="ltr" placeholder="https://instagram.com/…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-youtube">YouTube URL</Label>
          <Input id="p-youtube" value={form.youtube} onChange={set("youtube")} dir="ltr" placeholder="https://youtube.com/@…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-tiktok">TikTok URL</Label>
          <Input id="p-tiktok" value={form.tiktok} onChange={set("tiktok")} dir="ltr" placeholder="https://tiktok.com/@…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-facebook">Facebook URL</Label>
          <Input id="p-facebook" value={form.facebook} onChange={set("facebook")} dir="ltr" placeholder="https://facebook.com/…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-x">X (Twitter) URL</Label>
          <Input id="p-x" value={form.x} onChange={set("x")} dir="ltr" placeholder="https://x.com/…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-linkedin">LinkedIn URL</Label>
          <Input id="p-linkedin" value={form.linkedin} onChange={set("linkedin")} dir="ltr" placeholder="https://linkedin.com/in/…" />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Hero &amp; intro-widget numbers (clients see these)
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-years">Years of experience</Label>
          <Input id="p-years" value={form.experienceYears} onChange={set("experienceYears")} dir="ltr" inputMode="numeric" placeholder="5" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-projects">Projects completed</Label>
          <Input id="p-projects" value={form.projectsDone} onChange={set("projectsDone")} dir="ltr" inputMode="numeric" placeholder="250" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-clients">Happy clients</Label>
          <Input id="p-clients" value={form.happyClients} onChange={set("happyClients")} dir="ltr" inputMode="numeric" placeholder="120" />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">About bio (empty = default text)</p>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="p-bio1">Bio — paragraph 1</Label>
          <Textarea id="p-bio1" value={form.bio1} onChange={set("bio1")} rows={3} maxLength={600} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="p-bio2">Bio — paragraph 2</Label>
          <Textarea id="p-bio2" value={form.bio2} onChange={set("bio2")} rows={2} maxLength={400} />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Voice intro (played by the side widget)</p>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="p-intro">Custom intro script (captions text)</Label>
          <Textarea
            id="p-intro"
            value={form.introScript}
            onChange={set("introScript")}
            rows={4}
            maxLength={900}
            placeholder="Hi, I'm Ubaid — a professional video editor with over 5 years of experience…"
          />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            This static build ships with the pre-recorded multilingual voice-overs (English &amp; Urdu use
            your custom studio recordings). The script below is stored with your profile for reference and
            future updates.
          </p>
        </div>
      </div>

      <Button type="submit" disabled={saving} className="mt-6 w-full gap-2 bg-electric hover:bg-glow sm:w-auto sm:px-10">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
