"use client";

/* ============================================================================
 * ADMIN → VIDEOS TAB — add (by YouTube/Vimeo/MP4 link or bundled file),
 * edit metadata, pin to the top of the portfolio, delete. Everything
 * published here is stored in localStorage and appears instantly on the site.
 * Publish to ALL visitors: Data tab → Export JSON → GitHub assets/data.json.
 * ========================================================================== */

import { useCallback, useEffect, useState } from "react";
import { Film, Link2, Loader2, Pencil, RefreshCw, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { cn } from "@/lib/utils";
import {
  addVideo,
  deleteVideo,
  getVideos,
  updateVideo,
  type VideoRecord,
} from "@/lib/local-data";

export const CATEGORIES = [
  { id: "meta-ads", label: "Meta Ads" },
  { id: "ugc-ads", label: "UGC Ads" },
];

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

const CATEGORY_HINTS: Record<string, string> = {
  "meta-ads": "Meta Ads",
  "ugc-ads": "UGC Ads",
};

/** Publish-ready description written for the admin — editable if wanted. */
function buildDescription(title: string, category: string): string {
  const label = CATEGORY_HINTS[category] ?? "Video";
  return `${title} — professional ${label} edit by UBAID EDITS. Scroll-stopping hooks, clean pacing and a polished color grade, delivered ready to publish.`.slice(0, 400);
}

/** Video files that ship inside the package (assets/uploads/videos). */
const BUNDLED_VIDEOS = [
  { path: "/uploads/videos/ssspin-real-estate-ad.mp4", label: "ssspin — Real Estate Agent Ad" },
  { path: "/uploads/videos/muhammad-imran-applicator.mp4", label: "Muhammad Imran Applicator — Brand Promo" },
  { path: "/uploads/videos/vicmart-uk-ad.mp4", label: "VicMart — UK English Product Ad" },
  { path: "/uploads/videos/cockroach-gel-ugc.mp4", label: "Cockroach Gel — UGC Ad" },
];

/** Thumbnail stills that ship inside the package (assets/uploads/thumbs). */
const BUNDLED_THUMBS = [
  "/uploads/thumbs/ssspin-real-estate-ad-a.jpg",
  "/uploads/thumbs/ssspin-real-estate-ad-b.jpg",
  "/uploads/thumbs/muhammad-imran-applicator-a.jpg",
  "/uploads/thumbs/muhammad-imran-applicator-b.jpg",
  "/uploads/thumbs/vicmart-uk-ad-a.jpg",
  "/uploads/thumbs/vicmart-uk-ad-b.jpg",
  "/uploads/thumbs/cockroach-gel-ugc-a.jpg",
  "/uploads/thumbs/cockroach-gel-ugc-b.jpg",
  "/uploads/thumbs/36de91cf-af26-4e7c-bd67-09350505cfa5-b.jpg",
  "/uploads/thumbs/52459a0d-0f73-4adf-93f1-d01ca946d9bc-b.jpg",
  "/uploads/thumbs/8e614aa0-2d9c-4c1e-959c-8565a4a1d257-b.jpg",
  "/uploads/thumbs/d4750d84-d196-41fc-bff0-7e6c3d64481f-b.jpg",
  "/uploads/thumbs/dfbbf875-fa72-4300-8966-d6d99c544ad0-b.jpg",
  "/uploads/thumbs/f561cf9d-4c8a-4dd4-b48d-6d792a69d92d-b.jpg",
];

/* ------------------------------------------------------------------ */
/* Add card                                                            */
/* ------------------------------------------------------------------ */
function AddVideoCard({ onAdded }: { onAdded: () => void }) {
  const { toast } = useToast();

  const [videoUrl, setVideoUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [thumb2Url, setThumb2Url] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("meta-ads");
  const [featured, setFeatured] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setVideoUrl("");
    setThumbUrl("");
    setThumb2Url("");
    setTitle("");
    setDescription("");
    setCategory("meta-ads");
    setFeatured(false);
    setVertical(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      toast({ title: "Missing video link", description: "Paste a YouTube/Vimeo/MP4 link or pick a bundled file.", variant: "destructive" });
      return;
    }
    if (!title.trim()) {
      toast({ title: "Missing title", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      addVideo({
        title: title.trim(),
        description: (description.trim() || buildDescription(title.trim(), category)).trim(),
        category,
        videoPath: videoUrl.trim(),
        thumbPath: thumbUrl.trim(),
        thumbPath2: thumb2Url.trim(),
        duration: "",
        seconds: 0,
        vertical,
        featured,
        sizeMb: 0,
        createdAt: new Date().toISOString(),
      });
      toast({ title: "Video published", description: "It now appears in the portfolio on this browser." });
      reset();
      onAdded();
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-line bg-card/60 p-5 sm:p-6"
      aria-label="Add video"
    >
      <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
        <Link2 className="h-4 w-4 text-glow" />
        Add a video
      </h2>

      <div className="mt-4 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="v-url">Video link *</Label>
          <Input
            id="v-url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            dir="ltr"
            placeholder="https://youtube.com/watch?v=… or https://…/video.mp4"
            maxLength={600}
          />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-muted-foreground">Or use a bundled file:</span>
            <Select
              value=""
              onValueChange={(v) => {
                setVideoUrl(v);
                const match = BUNDLED_VIDEOS.find((b) => b.path === v);
                if (match && !title.trim()) {
                  setTitle(match.label);
                  setDescription(buildDescription(match.label, category));
                }
              }}
            >
              <SelectTrigger aria-label="Pick a bundled video" className="h-8 w-auto text-[11px]">
                <SelectValue placeholder="Pick bundled…" />
              </SelectTrigger>
              <SelectContent>
                {BUNDLED_VIDEOS.map((b) => (
                  <SelectItem key={b.path} value={b.path}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            YouTube / Vimeo links play in the site player. For a new MP4: add the file to{" "}
            <code className="text-electric">assets/uploads/videos/</code> on GitHub, then link it here
            (e.g. <code className="text-electric">/uploads/videos/my-ad.mp4</code>).
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="v-title">Title *</Label>
          <Input
            id="v-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. VicMart — UK Product Ad"
            maxLength={120}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="v-desc">Description</Label>
          <Textarea
            id="v-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One or two lines about the edit — shown on the card."
            rows={3}
            maxLength={400}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(v) => {
                setCategory(v);
                if (!description.trim() || description === buildDescription(title, category)) {
                  setDescription(buildDescription(title || "New project", v));
                }
              }}
            >
              <SelectTrigger aria-label="Category">
                <SelectValue placeholder="Pick a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v-thumb">Thumbnail link (optional)</Label>
            <Input
              id="v-thumb"
              value={thumbUrl}
              onChange={(e) => setThumbUrl(e.target.value)}
              dir="ltr"
              list="bundled-thumbs"
              placeholder="/uploads/thumbs/… or https://…"
              maxLength={600}
            />
            <datalist id="bundled-thumbs">
              {BUNDLED_THUMBS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v-thumb2">Second still — hover switch (optional)</Label>
            <Input
              id="v-thumb2"
              value={thumb2Url}
              onChange={(e) => setThumb2Url(e.target.value)}
              dir="ltr"
              list="bundled-thumbs"
              placeholder="/uploads/thumbs/… or https://…"
              maxLength={600}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Feature (pin to top)</p>
              <p className="text-[11px] text-muted-foreground">Pins it to the top of the portfolio</p>
            </div>
            <Switch checked={featured} onCheckedChange={setFeatured} aria-label="Feature on top" />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Vertical video</p>
              <p className="text-[11px] text-muted-foreground">Reels / TikTok / Shorts style</p>
            </div>
            <Switch checked={vertical} onCheckedChange={setVertical} aria-label="Vertical video" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button type="submit" disabled={busy} className="flex-1 gap-2 bg-electric hover:bg-glow">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
          {busy ? "Working…" : "Publish video"}
        </Button>
        {videoUrl && !busy ? (
          <Button type="button" variant="outline" onClick={reset}>
            Clear
          </Button>
        ) : null}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Library list                                                        */
/* ------------------------------------------------------------------ */
function LibraryRow({
  video,
  onEdit,
  onDelete,
  onToggleFeatured,
}: {
  video: VideoRecord;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card/60 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-surface sm:aspect-video sm:h-16 sm:w-28">
        {video.thumbPath ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={video.thumbPath} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Film className="h-5 w-5 text-muted-foreground/50" />
          </div>
        )}
        {video.duration ? (
          <span className="absolute bottom-1 end-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white">
            {video.duration}
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="truncate text-sm font-bold text-foreground">{video.title}</p>
          {video.featured ? (
            <Badge className="border-0 bg-electric/15 text-[10px] font-bold tracking-wider text-[#e11d2e]">
              <Star className="me-1 h-3 w-3" /> FEATURED
            </Badge>
          ) : null}
        </div>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
          <span>{categoryLabel(video.category)}</span>
          <span aria-hidden="true">·</span>
          <span>{video.vertical ? "vertical" : "landscape"}</span>
          {/^https?:/.test(video.videoPath) ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">link</span>
            </>
          ) : null}
        </p>
        {video.description ? (
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground/80">
            {video.description}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => onToggleFeatured(!video.featured)}
          aria-label={video.featured ? "Remove from featured" : "Feature on top"}
          aria-pressed={video.featured}
          className={cn(
            "rounded-lg border p-2.5 transition",
            video.featured
              ? "border-electric bg-electric/15 text-glow"
              : "border-line text-muted-foreground hover:border-electric hover:text-foreground"
          )}
        >
          <Star className="h-4 w-4" />
        </button>
        <button
          onClick={onEdit}
          aria-label="Edit video"
          className="rounded-lg border border-line p-2.5 text-muted-foreground transition hover:border-electric hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          aria-label="Delete video"
          className="rounded-lg border border-line p-2.5 text-muted-foreground transition hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab                                                                 */
/* ------------------------------------------------------------------ */
export function VideosTab() {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [editing, setEditing] = useState<VideoRecord | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "meta-ads",
    videoPath: "",
    thumbPath: "",
    thumbPath2: "",
    vertical: false,
  });
  const [editBusy, setEditBusy] = useState(false);
  const [deleting, setDeleting] = useState<VideoRecord | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const loadVideos = useCallback(() => {
    setLoadingList(true);
    try {
      setVideos(getVideos());
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const saveEdit = () => {
    if (!editing) return;
    if (!editForm.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setEditBusy(true);
    try {
      updateVideo(editing.id, { ...editForm, title: editForm.title.trim() });
      toast({ title: "Saved", description: "Video updated on the site." });
      setEditing(null);
      loadVideos();
    } finally {
      setEditBusy(false);
    }
  };

  const toggleFeatured = (video: VideoRecord) => {
    updateVideo(video.id, { featured: !video.featured });
    toast({
      title: video.featured ? "Removed from featured" : "Pinned to the top",
      description: video.featured ? undefined : "It now appears first in the portfolio.",
    });
    loadVideos();
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      deleteVideo(deleting.id);
      toast({ title: "Deleted", description: `"${deleting.title}" was removed from the site.` });
      setDeleting(null);
      loadVideos();
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <main className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <AddVideoCard onAdded={() => loadVideos()} />

      {/* Library */}
      <section aria-label="Published videos" className="rounded-3xl border border-line bg-card/40 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
            <Film className="h-4 w-4 text-glow" />
            Published videos
            <Badge variant="outline" className="border-line text-[10px] text-muted-foreground">
              {videos.length}
            </Badge>
          </h2>
          <button
            onClick={() => loadVideos()}
            aria-label="Refresh list"
            className="rounded-lg border border-line p-2 text-muted-foreground transition hover:border-electric hover:text-foreground"
          >
            <RefreshCw className={cn("h-4 w-4", loadingList && "animate-spin")} />
          </button>
        </div>

        <div className="mt-4 max-h-[720px] space-y-3 overflow-y-auto pe-1">
          {loadingList && videos.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-electric" />
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line p-8 text-center">
              <Film className="h-6 w-6 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No videos published yet — add the first one.
              </p>
            </div>
          ) : (
            videos.map((v) => (
              <LibraryRow
                key={v.id}
                video={v}
                onEdit={() => {
                  setEditing(v);
                  setEditForm({
                    title: v.title,
                    description: v.description,
                    category: v.category,
                    videoPath: v.videoPath,
                    thumbPath: v.thumbPath,
                    thumbPath2: v.thumbPath2,
                    vertical: v.vertical,
                  });
                }}
                onDelete={() => setDeleting(v)}
                onToggleFeatured={() => toggleFeatured(v)}
              />
            ))
          )}
        </div>
      </section>

      {/* Edit dialog */}
      <Dialog open={editing !== null} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="border-line bg-card p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Edit video</DialogTitle>
          </DialogHeader>
          <div className="grid max-h-[70vh] gap-4 overflow-y-auto pe-1">
            <div className="space-y-1.5">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                maxLength={120}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                maxLength={400}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-url">Video link</Label>
              <Input
                id="edit-url"
                value={editForm.videoPath}
                onChange={(e) => setEditForm({ ...editForm, videoPath: e.target.value })}
                dir="ltr"
                maxLength={600}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-thumb">Thumbnail link</Label>
                <Input
                  id="edit-thumb"
                  value={editForm.thumbPath}
                  onChange={(e) => setEditForm({ ...editForm, thumbPath: e.target.value })}
                  dir="ltr"
                  maxLength={600}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-thumb2">Second still link</Label>
                <Input
                  id="edit-thumb2"
                  value={editForm.thumbPath2}
                  onChange={(e) => setEditForm({ ...editForm, thumbPath2: e.target.value })}
                  dir="ltr"
                  maxLength={600}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(v) => setEditForm({ ...editForm, category: v })}
                >
                  <SelectTrigger aria-label="Category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">Vertical video</p>
                <Switch
                  checked={editForm.vertical}
                  onCheckedChange={(v) => setEditForm({ ...editForm, vertical: v })}
                  aria-label="Vertical video"
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={deleting !== null} onOpenChange={(v) => !v && setDeleting(null)}>
        <DialogContent className="border-line bg-card p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Delete video?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            &ldquo;{deleting?.title}&rdquo; will be removed from the site on this browser. This cannot be
            undone.
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
