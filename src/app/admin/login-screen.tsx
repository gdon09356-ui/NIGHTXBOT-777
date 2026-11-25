"use client";

/* ============================================================================
 * ADMIN LOGIN — password-only gate. The correct password unlocks a
 * sessionStorage flag (clears automatically when the tab closes).
 * Regular visitors never see this page: /admin is not linked anywhere on
 * the public site — the owner types the URL directly.
 * ========================================================================== */

import { useState } from "react";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { adminLogin } from "@/lib/local-data";

export function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const ok = await adminLogin(password);
      if (ok) {
        onSuccess();
      } else {
        toast({ title: "Login failed", description: "Wrong password.", variant: "destructive" });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-card/70 p-7 shadow-[0_40px_120px_-30px_rgba(225,29,46,0.25)] backdrop-blur">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand/ubaid-edits-logo-sm.jpg"
            alt="UBAID EDITS logo"
            width={72}
            height={72}
            className="h-18 w-18 rounded-2xl border border-line object-cover"
            priority
          />
          <p className="font-display mt-4 text-sm font-bold tracking-[0.22em] text-foreground">
            UBAID <span className="text-glow">EDITS</span>
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Admin Panel
          </p>
        </div>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                autoComplete="current-password"
                className="ps-9"
              />
            </div>
          </div>
          <Button type="submit" disabled={busy || !password} className="w-full gap-2 bg-electric hover:bg-glow">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            {busy ? "Checking…" : "Unlock panel"}
          </Button>
        </form>

        <p className="mt-5 rounded-xl border border-line bg-surface/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
          Private area — only the site owner has the password. Everything you publish here is saved in
          this browser and survives refreshing.
        </p>
      </div>
    </div>
  );
}
