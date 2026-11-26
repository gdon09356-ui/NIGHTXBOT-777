"use client";

/* ============================================================================
 * THEME TOGGLE — light/dark switch (next-themes, class strategy).
 * Sun while in light mode, Moon while in dark mode; persisted per visitor
 * and respected on both the public site and the admin panel.
 * ========================================================================== */
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* hydration-safe "mounted" flag — no setState-in-effect */
const emptySubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted-foreground transition hover:border-electric/60 hover:text-foreground",
        className
      )}
    >
      {mounted ? (
        dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4 opacity-0" aria-hidden="true" />
      )}
    </button>
  );
}
