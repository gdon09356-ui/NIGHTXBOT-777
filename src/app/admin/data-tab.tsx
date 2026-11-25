"use client";

/* ============================================================================
 * ADMIN → DATA TAB — publish your changes to EVERY visitor.
 * ----------------------------------------------------------------------------
 * This static site stores admin edits in localStorage (this browser only).
 * The copy every visitor sees ships as assets/data.json inside the repo.
 * Workflow:
 *   1. Export JSON (button below — copies the full site data)
 *   2. Open the GitHub repo → assets/data.json → edit (pencil icon)
 *   3. Select all, paste, commit changes
 *   4. Vercel redeploys automatically — every visitor now sees your content.
 * Import restores a previously exported JSON into this browser.
 * "Reset" drops local overrides and shows the shipped data.json again.
 * ========================================================================== */

import { useState } from "react";
import { ClipboardCopy, Download, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { exportSiteData, importSiteData, resetLocalData } from "@/lib/local-data";

export function DataTab() {
  const { toast } = useToast();
  const [json, setJson] = useState("");
  const [busy, setBusy] = useState(false);

  const onExport = async () => {
    const data = exportSiteData();
    setJson(data);
    try {
      await navigator.clipboard.writeText(data);
      toast({ title: "JSON copied to clipboard", description: "Paste it into assets/data.json on GitHub to publish." });
    } catch {
      toast({ title: "JSON generated below", description: "Clipboard blocked — copy it manually from the box." });
    }
  };

  const onDownload = () => {
    const blob = new Blob([exportSiteData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = () => {
    setBusy(true);
    try {
      const res = importSiteData(json);
      if (res.ok) {
        toast({ title: "Data imported", description: "This browser now shows the imported content." });
        setJson("");
      } else {
        toast({ title: "Import failed", description: res.error, variant: "destructive" });
      }
    } finally {
      setBusy(false);
    }
  };

  const onReset = () => {
    resetLocalData();
    toast({ title: "Local changes cleared", description: "The site data that ships with the repo is shown again." });
  };

  return (
    <main className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-line bg-card/60 p-5 sm:p-6" aria-label="Publish changes">
        <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
          <ClipboardCopy className="h-4 w-4 text-glow" />
          Publish to every visitor
        </h2>
        <ol className="mt-4 list-decimal space-y-2 ps-5 text-[12px] leading-relaxed text-muted-foreground">
          <li>
            Edit your content in the <span className="font-bold text-foreground">Videos / Reviews / Profile</span>{" "}
            tabs — it is saved in this browser (survives refresh).
          </li>
          <li>
            Click <span className="font-bold text-foreground">Export JSON</span> below.
          </li>
          <li>
            On GitHub open <code className="text-electric">assets/data.json</code> → pencil icon → select all →
            paste → <span className="font-bold text-foreground">Commit changes</span>.
          </li>
          <li>Vercel redeploys automatically and every visitor sees the new content.</li>
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={onExport} className="gap-2 bg-electric hover:bg-glow">
            <ClipboardCopy className="h-4 w-4" />
            Export JSON
          </Button>
          <Button variant="outline" onClick={onDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download data.json
          </Button>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="data-json">Or paste a data.json here to import into this browser</Label>
          <Textarea
            id="data-json"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={8}
            className="font-mono text-[11px]"
            placeholder='{"testimonials": […], "videos": […], "profile": {…}}'
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={onImport} disabled={busy || !json.trim()} className="gap-2 bg-electric hover:bg-glow">
              <Upload className="h-4 w-4" />
              Import JSON
            </Button>
            <Button variant="outline" onClick={onReset} className="gap-2 text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Reset local changes
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-card/40 p-5 sm:p-6" aria-label="How storage works">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
          How the data is stored
        </h2>
        <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-muted-foreground">
          <p>
            <span className="font-bold text-foreground">This browser (localStorage)</span> — every edit you publish
            in the admin panel is saved in this browser immediately and survives refreshing. Other devices and
            visitors do not see these edits until you publish via data.json.
          </p>
          <p>
            <span className="font-bold text-foreground">assets/data.json (the repo)</span> — the content every
            visitor receives. Update it through GitHub to publish. The admin panel keeps working on any browser
            where you enter the password.
          </p>
          <p>
            <span className="font-bold text-foreground">Contact messages</span> — visitor submissions are stored in
            the visitor&apos;s browser and, most importantly, are delivered straight to your WhatsApp (the contact
            form opens a chat pre-filled with the client&apos;s brief).
          </p>
          <p className="rounded-xl border border-line bg-surface/50 p-3">
            Password protected — the admin panel is not linked anywhere on the public site. Keep the{" "}
            <code className="text-electric">/admin</code> URL private.
          </p>
        </div>
      </section>
    </main>
  );
}
