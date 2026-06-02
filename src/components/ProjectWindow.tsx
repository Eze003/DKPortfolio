"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectWindowProps = {
  project: Project;
  onClose: () => void;
};

function TrafficLights({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onClose}
        className="h-3 w-3 rounded-full bg-[#ff5f57] transition hover:brightness-90"
        aria-label="Close"
      />
      <span
        className="h-3 w-3 rounded-full bg-[#febc2e]"
        aria-hidden
      />
      <span
        className="h-3 w-3 rounded-full bg-[#28c840]"
        aria-hidden
      />
    </div>
  );
}

function GalleryImage({
  image,
  showInstagram,
  instagramUrl,
}: {
  image: Project["detail"]["gallery"][number];
  showInstagram?: boolean;
  instagramUrl?: string;
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 sm:rounded-3xl">
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div
          className={`h-full w-full ${image.placeholderClassName ?? "bg-zinc-200"}`}
          role="img"
          aria-label={image.alt}
        />
      )}
      {showInstagram && instagramUrl && (
        <Link
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-medium text-black transition hover:bg-white/95"
        >
          Instagram
        </Link>
      )}
    </div>
  );
}

export function ProjectWindow({ project, onClose }: ProjectWindowProps) {
  const { detail } = project;
  const [first, second] = detail.gallery;

  return (
    <div
      className="glass-panel project-window mx-auto w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <header className="glass-panel__header flex items-center gap-4 px-4 py-3 sm:px-5">
        <TrafficLights onClose={onClose} />
        <p className="flex-1 truncate text-center text-xs font-medium text-zinc-400">
          {project.label}
        </p>
        <div className="w-[52px]" aria-hidden />
      </header>

      <div className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
        <h1
          id="project-title"
          className="text-3xl font-bold tracking-tight text-black sm:text-4xl"
        >
          {project.label}
        </h1>

        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-black">Client</dt>
            <dd className="mt-0.5 text-zinc-500">{detail.client}</dd>
          </div>
          <div>
            <dt className="font-semibold text-black">Year</dt>
            <dd className="mt-0.5 text-zinc-500">{detail.year}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-semibold text-black">Project type</dt>
            <dd className="mt-0.5 text-zinc-500">{detail.projectType}</dd>
          </div>
        </dl>

        {detail.description && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            {detail.description}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {first && (
            <GalleryImage
              image={first}
              showInstagram
              instagramUrl={detail.instagramUrl}
            />
          )}
          {second && <GalleryImage image={second} />}
        </div>
      </div>
    </div>
  );
}
