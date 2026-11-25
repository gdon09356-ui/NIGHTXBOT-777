"use client";

/* ============================================================================
 * ADMIN → TESTIMONIALS TAB — manage the client reviews shown on the site:
 * add (with optional client photo), edit, delete. Stored in localStorage —
 * publish to every visitor via the Data tab (Export JSON → GitHub).
 * ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MessageSquareQuote, Pencil, Plus, RefreshCw, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_TAGS } from "@/hooks/use-testimonials";
import {
  addTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
  type TestimonialRecord,
} from "@/lib/local-data";

type AdminTestimonial = TestimonialRecord;

const SERVICE_OPTIONS = Object.entries(SERVICE_TAGS).map(([id, label]) => ({ id, label }));

const emptyForm = {
  name: "",
  company: "",
  country: "",
  service: "meta-ads",
  quote: "",
  rating: 5,
};

/** Client photo → 256×256 JPEG data URL (keeps localStorage small). */
async function fileToAvatarDataUrl(file: File): Promise<string | null> {
  try {
    const bitmap = await createImageBitmap(file);
    const side = Math.min(bitmap.width, bitmap.height);
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const sx = (bitmap.width - side) / 2;
    const sy = Math.max(0, (bitmap.height - side) * 0.35); // keep heads in frame
    ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    return null;
  }
}

export function TestimonialsTab() {
  const { toast } = useToast();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Add form state
  const [form, setForm] = useState({ ...emptyForm });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  // Edit dialog state
  const [editing, setEditing] = useState<AdminTestimonial | null>(null);
  const [editForm, setEditForm] = useState({ ...emptyForm });
  const [editBusy, setEditBusy] = useState(false);

  const [deleting, setDeleting] = useState<AdminTestimonial | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    try {
      setItems(getTestimonials());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) {
      toast({ title: "Missing fields", description: "Client name and review text are required.", variant: "destructive" });
      return;
    }
    setAdding(true);
    try {
      let avatarPath = "";
      if (avatar) {
        const dataUrl = await fileToAvatarDataUrl(avatar);
        if (dataUrl) avatarPath = dataUrl;
        else toast({ title: "Photo skipped", description: "That image could not be processed.", variant: "destructive" });
      }
      addTestimonial({
        name: form.name.trim(),
        company: form.company.trim(),
        country: form.country.trim(),
        service: form.service,
        quote: form.quote.trim(),
        rating: form.rating,
        avatarPath,
        order: items.length + 1,
      });
      toast({ title: "Review published", description: "It now appears on the site." });
      setForm({ ...emptyForm });
      setAvatar(null);
      load();
    } finally {
      setAdding(false);
    }
  };

  const saveEdit = () => {
    if (!editing) return;
    if (!editForm.name.trim() || !editForm.quote.trim()) {
      toast({ title: "Missing fields", variant: "destructive" });
      return;
    }
    setEditBusy(true);
    try {
      updateTestimonial(editing.id, {
        name: editForm.name.trim(),
        company: editForm.company.trim(),
        country: editForm.country.trim(),
        service: editForm.service,
        quote: editForm.quote.trim(),
        rating: editForm.rating,
      });
      toast({ title: "Saved", description: "Review updated on the site." });
      setEditing(null);
      load();
    } finally {
      setEditBusy(false);
    }
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      deleteTestimonial(deleting.id);
      toast({ title: "Deleted", description: `"${deleting.name}" was removed.` });
      setDeleting(null);
      load();
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <main className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Add review */}
      <form
        onSubmit={addReview}
        className="rounded-3xl border border-line bg-card/60 p-5 sm:p-6"
        aria-label="Add review"
      >
        <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
          <Plus className="h-4 w-4 text-glow" />
          Add a review
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="t-name">Client name *</Label>
            <Input
              id="t-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Daniel Reeves"
              maxLength={80}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="t-company">Company / role</Label>
            <Input
              id="t-company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="e.g. Founder — Reeves Fitness"
              maxLength={100}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="t-country">Country</Label>
            <Input
              id="t-country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="e.g. United States"
              maxLength={60}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Service tag</Label>
            <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger aria-label="Service tag">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: parseInt(v, 10) })}>
              <SelectTrigger aria-label="Rating">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectItem key={r} value={String(r)}>
                    {r} star{r > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="t-quote">Review text *</Label>
            <Textarea
              id="t-quote"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              placeholder="What did the client say about the work?"
              rows={4}
              maxLength={600}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Client photo (optional)</Label>
            <Button type="button" variant="outline" onClick={() => avatarInputRef.current?.click()} className="w-full">
              {avatar ? avatar.name.slice(0, 30) : "Choose image…"}
            </Button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            />
            <p className="text-[11px] text-muted-foreground">
              Photos are resized to 256 px in your browser and saved with the review.
            </p>
          </div>
        </div>

        <Button type="submit" disabled={adding} className="mt-5 w-full gap-2 bg-electric hover:bg-glow">
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {adding ? "Publishing…" : "Publish review"}
        </Button>
      </form>

      {/* List */}
      <section aria-label="Published reviews" className="rounded-3xl border border-line bg-card/40 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
            <MessageSquareQuote className="h-4 w-4 text-glow" />
            Published reviews
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
              <MessageSquareQuote className="h-6 w-6 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No reviews yet — add the first one.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-2xl border border-line bg-card/60 p-3 sm:p-4">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-surface">
                  {item.avatarPath ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.avatarPath} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-foreground">
                      {item.name.slice(0, 1)}
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="truncate text-sm font-bold text-foreground">{item.name}</p>
                    <Badge variant="outline" className="border-line text-[9px] font-semibold text-muted-foreground">
                      {SERVICE_TAGS[item.service] ?? item.service}
                    </Badge>
                    <span className="flex items-center gap-0.5" aria-label={`${item.rating} stars`}>
                      {Array.from({ length: item.rating }, (_, i) => (
                        <Star key={i} className="h-3 w-3 fill-electric text-electric" aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {[item.company, item.country].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground/80">
                    {item.quote}
                  </p>
                </div>
                <div className="flex shrink-0 items-start gap-2">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setEditForm({
                        name: item.name,
                        company: item.company,
                        country: item.country,
                        service: item.service,
                        quote: item.quote,
                        rating: item.rating,
                      });
                    }}
                    aria-label="Edit review"
                    className="rounded-lg border border-line p-2.5 text-muted-foreground transition hover:border-electric hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleting(item)}
                    aria-label="Delete review"
                    className="rounded-lg border border-line p-2.5 text-muted-foreground transition hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Edit dialog */}
      <Dialog open={editing !== null} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="border-line bg-card p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Edit review</DialogTitle>
          </DialogHeader>
          <div className="grid max-h-[70vh] gap-4 overflow-y-auto pe-1 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="et-name">Client name</Label>
              <Input
                id="et-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="et-company">Company / role</Label>
              <Input
                id="et-company"
                value={editForm.company}
                onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                maxLength={100}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="et-country">Country</Label>
              <Input
                id="et-country"
                value={editForm.country}
                onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                maxLength={60}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Select
                value={String(editForm.rating)}
                onValueChange={(v) => setEditForm({ ...editForm, rating: parseInt(v, 10) })}
              >
                <SelectTrigger aria-label="Rating">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {r} star{r > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Service tag</Label>
              <Select value={editForm.service} onValueChange={(v) => setEditForm({ ...editForm, service: v })}>
                <SelectTrigger aria-label="Service tag">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="et-quote">Review text</Label>
              <Textarea
                id="et-quote"
                value={editForm.quote}
                onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })}
                rows={4}
                maxLength={600}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={editBusy} className="gap-2 bg-electric hover:bg-glow">
              {editBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={deleting !== null} onOpenChange={(v) => !v && setDeleting(null)}>
        <DialogContent className="border-line bg-card p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Delete review?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            The review from &ldquo;{deleting?.name}&rdquo; will be removed from the site. This cannot
            be undone.
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
