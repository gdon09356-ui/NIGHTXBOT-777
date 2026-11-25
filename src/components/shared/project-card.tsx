"use client";

/* Portfolio card — cinematic thumbnail, hover preview, play → modal. */
import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/language-context";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  categoryLabel,
  onPlay,
  priority = false,
  className,
}: {
  project: Project;
  categoryLabel: string;
  onPlay: (p: Project) => void;
  priority?: boolean;
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const previewable = project.video && project.video.type !== "youtube" && project.video.type !== "vimeo";

  const onEnter = () => {
    setHovering(true);
    if (previewable && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    setHovering(false);
    videoRef.current?.pause();
  };

  const title = project.title[locale];
  const description = project.description[locale];

  return (
    <article
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card transition duration-500 hover:border-electric/70 hover:shadow-[0_28px_70px_-28px_rgba(225,29,46,0.55)]",
        className
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onPlay(project)}
      onKeyDown={(e) => e.key === "Enter" && onPlay(project)}
      tabIndex={0}
      role="button"
      aria-label={`${t.portfolio.openPlayer}: ${title}`}
    >
      <div className={cn("relative w-full overflow-hidden", project.vertical ? "aspect-[9/16]" : "aspect-video")}>
        <Image
          src={project.thumbnail}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition duration-700",
            hovering ? "scale-105 opacity-0" : "group-hover:scale-105"
          )}
        />
        {previewable ? (
          <video
            ref={videoRef}
            src={project.video!.src}
            muted
            loop
            playsInline
            preload="none"
            poster={project.thumbnail}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition duration-700",
              hovering ? "opacity-100 scale-105" : "opacity-0"
            )}
          />
        ) : null}

        {/* gradient + labels */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute start-3 top-3 flex gap-2">
          {project.demo ? (
            <Badge variant="outline" className="border-electric/60 bg-black/60 text-[10px] font-bold tracking-widest text-[#7ea2ff] backdrop-blur">
              {t.common.demo}
            </Badge>
          ) : null}
          <Badge variant="outline" className="border-white/20 bg-black/60 text-[10px] font-semibold tracking-widest text-white/80 backdrop-blur">
            {categoryLabel}
          </Badge>
        </div>
        <span className="absolute end-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold tabular-nums text-white/90 backdrop-blur">
          {project.duration}
        </span>

        {/* play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-electric group-hover:bg-electric group-hover:shadow-[0_0_36px_rgba(225,29,46,0.7)]">
            <Play className="ms-0.5 h-5 w-5 fill-current" />
          </span>
        </div>

        {/* bottom copy */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-sm font-bold text-white sm:text-[15px]">{title}</h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/70 sm:text-xs">{description}</p>
        </div>
      </div>
    </article>
  );
}
