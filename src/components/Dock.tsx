"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { DockNotesIcon } from "@/components/dock/DockNotesIcon";
import { TransparentFolder } from "@/components/TransparentFolder";
import { dockItems, type DockItem, type Project } from "@/data/projects";

const BASE_SIZE_DESKTOP = 60;
const BASE_SIZE_MOBILE = 48;
const MAX_SCALE = 1.45;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 639px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function DockMotionsGaadIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#0886FD] font-bold leading-none text-black"
      aria-hidden
    >
      M
    </span>
  );
}

function DockInstagramIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-sm"
      aria-hidden
    >
      <SiInstagram
        style={{ width: size * 0.62, height: size * 0.62 }}
        className="text-white"
      />
    </span>
  );
}

function DockTelegramIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#26A5E4] shadow-sm"
      aria-hidden
    >
      <FaTelegramPlane
        style={{ width: size * 0.58, height: size * 0.58 }}
        className="text-white"
      />
    </span>
  );
}

function DockWhatsappIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#25D366] shadow-sm"
      aria-hidden
    >
      <SiWhatsapp
        style={{ width: size * 0.58, height: size * 0.58 }}
        className="text-white"
      />
    </span>
  );
}

function DockIcon({ item, size }: { item: DockItem; size: number }) {
  switch (item.icon) {
    case "motions-gaad":
      return <DockMotionsGaadIcon size={size} />;
    case "notes":
      return <DockNotesIcon size={size} />;
    case "instagram":
      return <DockInstagramIcon size={size} />;
    case "telegram":
      return <DockTelegramIcon size={size} />;
    case "whatsapp":
      return <DockWhatsappIcon size={size} />;
  }
}

function MinimizedProjectDockIcon({
  project,
  size,
}: {
  project: Project;
  size: number;
}) {
  const isFolder = project.kind === "folder";
  const TILE_CLASS =
    "relative shrink-0 overflow-hidden rounded-[9px] shadow-sm ring-1 ring-white/10 flex items-center justify-center";

  if (isFolder && project.folderPreviews) {
    return (
      <span
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center"
        aria-hidden
      >
        <span style={{ transform: "scale(0.8)" }} className="flex shrink-0">
          <TransparentFolder previews={project.folderPreviews} size={size} />
        </span>
      </span>
    );
  }

  return (
    <span
      style={{ width: size, height: size }}
      className={`${TILE_CLASS} ${!project.thumbnail ? (project.fallbackClassName ?? "bg-zinc-800") : "bg-zinc-900"}`}
      aria-hidden
    >
      {project.thumbnail ? (
        <Image
          src={project.thumbnail}
          alt=""
          fill
          className="object-cover rounded-[9px]"
          sizes={`${size}px`}
        />
      ) : (
        <span
          style={{ fontSize: size * 0.45 }}
          className="flex h-full w-full items-center justify-center font-semibold text-white leading-none"
        >
          {project.fallbackContent || project.label[0]}
        </span>
      )}
    </span>
  );
}

export function Dock({
  minimizedProjects = [],
  onRestoreProject,
}: {
  minimizedProjects?: Project[];
  onRestoreProject?: (id: string) => void;
}) {
  const dockRef = useRef<HTMLUListElement>(null);
  const isMobile = useIsMobile();
  const baseSize = isMobile ? BASE_SIZE_MOBILE : BASE_SIZE_DESKTOP;

  const [scales, setScales] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const updateScales = useCallback((clientX: number | null) => {
    const dock = dockRef.current;
    if (!dock || clientX === null) {
      setScales([]);
      return;
    }

    const items = dock.querySelectorAll<HTMLElement>("[data-dock-item]");
    const next = Array.from(items).map((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - center);
      const influence = 120;
      if (distance > influence) return 1;
      const t = 1 - distance / influence;
      return 1 + (MAX_SCALE - 1) * t * t;
    });
    setScales(next);
  }, []);

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 sm:bottom-11"
      aria-label="Social links"
      onMouseLeave={() => {
        setHoveredId(null);
        updateScales(null);
      }}
    >
      <ul
        ref={dockRef}
        className="glass-dock flex items-end gap-2 rounded-[18px] px-3 py-1.5 sm:gap-3.5 sm:rounded-[24px] sm:px-5 sm:py-2"
        onMouseMove={(e) => {
          // Disable magnification on touch/mobile
          if (!isMobile) updateScales(e.clientX);
        }}
      >
        {dockItems.map((item, index) => (
          <li key={item.id} className="relative flex flex-col items-center">
            {!isMobile && hoveredId === item.id && (
              <span
                className="glass-dock-glow pointer-events-none absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-2xl"
                aria-hidden
              />
            )}
            <Link
              href={item.href}
              data-dock-item
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              onMouseEnter={() => !isMobile && setHoveredId(item.id)}
              onFocus={() => !isMobile && setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              className="relative flex items-end rounded-xl p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 transition-transform duration-100 ease-out"
              style={
                isMobile
                  ? undefined
                  : {
                      transform: `translateY(${((scales[index] ?? 1) - 1) * -24}px) scale(${scales[index] ?? 1})`,
                      transformOrigin: "bottom center",
                    }
              }
              aria-label={item.label}
            >
              {!isMobile && hoveredId === item.id && (
                <span
                  className="glass-tooltip pointer-events-none absolute left-1/2 bottom-[calc(100%+8px)] whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium text-black"
                  style={{
                    transform: `translateX(-50%) scale(${1 / (scales[index] ?? 1)})`,
                    transformOrigin: "bottom center",
                  }}
                >
                  {item.label}
                </span>
              )}
              <DockIcon item={item} size={baseSize} />
            </Link>
          </li>
        ))}

        {minimizedProjects.length > 0 && (
          <>
            <div
              className="h-8 w-px bg-white/20 self-center mx-1"
              aria-hidden
            />
            {minimizedProjects.map((project, idx) => {
              const globalIndex = dockItems.length + idx;
              const isHovered = hoveredId === project.id;
              return (
                <li
                  key={project.id}
                  className="dock-minimized-icon relative flex flex-col items-center"
                >
                  {!isMobile && isHovered && (
                    <span
                      className="glass-dock-glow pointer-events-none absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-2xl"
                      aria-hidden
                    />
                  )}
                  <button
                    type="button"
                    data-dock-item
                    onClick={() => onRestoreProject?.(project.id)}
                    onMouseEnter={() => !isMobile && setHoveredId(project.id)}
                    onFocus={() => !isMobile && setHoveredId(project.id)}
                    onBlur={() => setHoveredId(null)}
                    className="relative flex cursor-pointer items-end rounded-xl p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 transition-transform duration-100 ease-out"
                    style={
                      isMobile
                        ? undefined
                        : {
                            transform: `translateY(${((scales[globalIndex] ?? 1) - 1) * -24}px) scale(${scales[globalIndex] ?? 1})`,
                            transformOrigin: "bottom center",
                          }
                    }
                    aria-label={`Restore ${project.label}`}
                  >
                    {!isMobile && isHovered && (
                      <span
                        className="glass-tooltip pointer-events-none absolute left-1/2 bottom-[calc(100%+8px)] whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium text-black"
                        style={{
                          transform: `translateX(-50%) scale(${1 / (scales[globalIndex] ?? 1)})`,
                          transformOrigin: "bottom center",
                        }}
                      >
                        {project.label}
                      </span>
                    )}
                    <MinimizedProjectDockIcon
                      project={project}
                      size={baseSize}
                    />
                  </button>
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-white animate-pulse" />
                </li>
              );
            })}
          </>
        )}
      </ul>
    </nav>
  );
}
