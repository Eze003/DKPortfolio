"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectWindowProps = {
  project: Project;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
};

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Red — close */}
      <button
        type="button"
        onClick={onClose}
        className="h-3 w-3 cursor-pointer rounded-full bg-[#ff5f57] transition hover:brightness-75 active:scale-90"
        aria-label="Close"
      />
      {/* Yellow — minimise */}
      <button
        type="button"
        onClick={onMinimize}
        className="h-3 w-3 cursor-pointer rounded-full bg-[#febc2e] transition hover:brightness-75 active:scale-90"
        aria-label="Minimise"
      />
      {/* Green — maximise */}
      <button
        type="button"
        onClick={onMaximize}
        className="h-3 w-3 cursor-pointer rounded-full bg-[#28c840] transition hover:brightness-75 active:scale-90"
        aria-label="Maximise"
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
  const isVideo = image.src ? (/\.(mp4|mov|webm|ogg|avi)$/i.test(image.src) || image.src.includes("/video/")) : false;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 sm:rounded-3xl">
      {image.src ? (
        isVideo ? (
          <video
            src={image.src}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )
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
          className="glass-pill absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-medium text-black transition hover:bg-white/95 z-10"
        >
          Instagram
        </Link>
      )}
    </div>
  );
}

export function ProjectWindow({
  project,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: ProjectWindowProps) {
  const { detail } = project;

  return (
    <div
      className={`glass-panel project-window mx-auto w-full overflow-hidden transition-all duration-300 ${
        isMaximized
          ? "h-full w-full rounded-none flex flex-col"
          : "max-w-4xl rounded-2xl sm:rounded-3xl"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <header className="glass-panel__header flex items-center gap-4 px-4 py-3 sm:px-5">
        <TrafficLights
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        />
        <p className="flex-1 truncate text-center text-xs font-medium text-zinc-400">
          {project.label}
        </p>
        {/* Spacer to balance the traffic lights */}
        <div className="w-[52px]" aria-hidden />
      </header>

      <div className={`px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 ${isMaximized ? "flex-1 overflow-y-auto" : ""}`}>
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

        {detail.gallery && detail.gallery.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {detail.gallery.map((img, idx) => (
              <GalleryImage
                key={idx}
                image={img}
                showInstagram={idx === 0}
                instagramUrl={detail.instagramUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
