"use client";

/* ============================================================================
 * ADMIN → MESSAGES TAB — the contact-form inbox. Every project brief
 * submitted through the public site on THIS browser lands here (and goes
 * straight to Ubaid's WhatsApp). Delete entries anytime.
 * ========================================================================== */
import { useCallback, useEffect, useState } from "react";
import { Loader2, Inbox, Mail, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteSubmission, getSubmissions, type SubmissionRecord } from "@/lib/local-data";

type Submission = SubmissionRecord;

export function MessagesTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<Submission | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    try {
      setItems(getSubmissions());
    } catch {
      toast({ title: "Could not load messages", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const confirmDelete = () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      deleteSubmission(deleting.id);
      toast({ title: "Deleted" });
      setDeleting(null);
      load();
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <main>
      <section aria-label="Contact inbox" className="rounded-3xl border border-line bg-card/40 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
            <Inbox className="h-4 w-4 text-glow" />
            Project briefs inbox
            <Badge variant="outline" className="border-line text-[10px] text-muted-foreground">
              {items.length}
            </Badge>
          </h2>
          <button
            onClick={() => load()}
            aria-label="Refresh list"
            className="rounded-lg border border-line p-2 text-muted-foreground transition hover:border-electric hover:text-foreground"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="mt-4 max-h-[720px] space-y-3 overflow-y-auto pe-1">
          {loading && items.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-electric" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line p-8 text-center">
              <Inbox className="h-6 w-6 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No briefs yet — submissions from the contact form on this browser appear here.
                Important: every submission also opens WhatsApp with the brief pre-filled, so
                nothing gets lost even on a static site.
              </p>
            </div>
          ) : (
            items.map((s) => (
              <article key={s.id} className="rounded-2xl border border-line bg-card/60 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-foreground">{s.name}</p>
                  <Badge variant="outline" className="border-line text-[9px] font-semibold text-muted-foreground">
                    {s.service}
                  </Badge>
                  {s.budget ? (
                    <Badge variant="outline" className="border-line text-[9px] font-semibold text-muted-foreground">
                      {s.budget}
                    </Badge>
                  ) : null}
                  <span className="ms-auto text-[10px] text-muted-foreground/70">
                    {new Date(s.createdAt).toLocaleString()}
                  </span>
                </div>
                <a
                  href={`mailto:${s.email}`}
                  className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium text-electric transition hover:text-glow"
                  dir="ltr"
                >
                  <Mail className="h-3.5 w-3.5" /> {s.email}
                </a>
                {s.company ? <p className="text-[11px] text-muted-foreground">{s.company}</p> : null}
                <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-muted-foreground">
                  {s.message}
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => setDeleting(s)}
                    aria-label="Delete message"
                    className="rounded-lg border border-line p-2.5 text-muted-foreground transition hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Delete confirm */}
      <Dialog open={deleting !== null} onOpenChange={(v) => !v && setDeleting(null)}>
        <DialogContent className="border-line bg-card p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Delete message?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            The brief from &ldquo;{deleting?.name}&rdquo; will be removed. This cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} disabled={deleteBusy} variant="destructive" className="gap-2">
              {deleteBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
