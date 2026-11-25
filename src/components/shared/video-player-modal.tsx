"use client";

/* Cinematic video player dialog — MP4/WebM with native controls plus
 * authorized YouTube/Vimeo embeds. Full-screen playback supported natively. */
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { VideoSource } from "@/content/projects";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

export type PlayerProject = {
  title: string;
  description?: string;
  category?: string;
  video?: VideoSource;
  vertical?: boolean;
  demo?: boolean;
  poster?: string;
};

function EmbedFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

export function VideoPlayerModal({
  project,
  open,
  onOpenChange,
}: {
  project: PlayerProject | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useLanguage();
  if (!project) return null;
  const isEmbed = project.video && (project.video.type === "youtube" || project.video.type === "vimeo");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl overflow-hidden border-line bg-[#0b0f16] p-4 sm:p-6"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle className="font-display truncate text-lg font-bold text-white">
                {project.title}
              </DialogTitle>
              {project.demo ? (
                <Badge variant="outline" className="border-electric/50 bg-electric/10 text-[10px] tracking-wider text-[#ff8a94]">
                  {t.common.demo}
                </Badge>
              ) : null}
              {project.category ? (
                <Badge variant="outline" className="border-line text-[10px] tracking-wider text-muted-foreground">
                  {project.category}
                </Badge>
              ) : null}
            </div>
            {project.description ? (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                {project.description}
              </p>
            ) : null}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            aria-label={t.portfolio.close}
            className="rounded-full border border-line p-2 text-muted-foreground transition hover:border-electric hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isEmbed ? (
          <EmbedFrame src={project.video!.src} title={project.title} />
        ) : (
          <video
            key={project.video?.src}
            controls
            playsInline
            preload="metadata"
            poster={project.poster}
            className={cn(
              "w-full overflow-hidden rounded-xl bg-black",
              project.vertical ? "mx-auto max-h-[70vh] w-auto" : "aspect-video"
            )}
          >
            <source src={project.video?.src} type={project.video?.type === "webm" ? "video/webm" : "video/mp4"} />
            {t.common.loading}
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
}
