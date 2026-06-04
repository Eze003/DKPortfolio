import Image from "next/image";
import type { Project } from "@/data/projects";
import { TransparentFolder } from "@/components/TransparentFolder";
import {
  DESKTOP_LABEL_CLASS,
} from "@/constants/desktop";

const TILE_CLASS =
  "relative shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-black/40 ring-1 ring-white/10 transition-[box-shadow,ring] duration-200";

type AppIconProps = {
  project: Project;
  onOpen: () => void;
};

export function AppIcon({ project, onOpen }: AppIconProps) {
  const isFolder = project.kind === "folder";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex cursor-pointer flex-col items-center gap-1.5 border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
      style={{ width: "var(--desktop-cell-width)" }}
    >
      <div className="relative p-1.5 rounded-[22px] transition-all duration-200 group-hover:scale-105 group-hover:ring-2 group-hover:ring-white group-hover:bg-white/5">
        {isFolder && project.folderPreviews ? (
          <TransparentFolder previews={project.folderPreviews} />
        ) : (
          <div
            className={`${TILE_CLASS} ${!project.thumbnail ? (project.fallbackClassName ?? "bg-zinc-800") : "bg-zinc-900"}`}
            style={{
              width: "var(--desktop-icon-size)",
              height: "var(--desktop-icon-size)",
            }}
          >
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 60px, 72px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-white">
                {project.fallbackContent}
              </span>
            )}
          </div>
        )}
      </div>

      <span
        className={`${DESKTOP_LABEL_CLASS} line-clamp-2 rounded px-0.5 py-px transition-colors duration-200 group-hover:bg-[#0a84ff] group-hover:text-white`}
        style={{ width: "var(--desktop-cell-width)" }}
      >
        {project.label}
      </span>
    </button>
  );
}
