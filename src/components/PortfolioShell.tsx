"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Project } from "@/data/projects";
import { Dock } from "@/components/Dock";
import { HelloIntro } from "@/components/HelloIntro";
import { HeroLogo } from "@/components/HeroLogo";
import { ProjectWindow } from "@/components/ProjectWindow";
import { BookServiceButton } from "@/components/BookServiceButton";

export function PortfolioShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        if (Array.isArray(data)) setDbProjects(data);
      })
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedProject = useMemo(
    () => (projectId ? dbProjects.find((p) => p.id === projectId) : undefined),
    [projectId, dbProjects],
  );
  const isDetailOpen = Boolean(selectedProject);
  const skipIntro = Boolean(projectId);
  const [introDone, setIntroDone] = useState(skipIntro);

  const [minimizedProjects, setMinimizedProjects] = useState<Project[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      const t = setTimeout(() => {
        setActiveProject(selectedProject);
        setIsWindowOpen(true);
      }, 20);
      return () => clearTimeout(t);
    } else {
      const t1 = setTimeout(() => {
        setIsWindowOpen(false);
      }, 0);
      const t2 = setTimeout(() => {
        setActiveProject(null);
      }, 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [selectedProject]);

  const openProject = useCallback(
    (id: string) => {
      setIsMaximized(false);
      const params = new URLSearchParams(searchParams.toString());
      params.set("project", id);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const closeProject = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("project");
    const query = params.toString();
    router.push(query ? `?${query}` : "/", { scroll: false });
  }, [router, searchParams]);

  const handleMinimize = useCallback(() => {
    if (selectedProject) {
      setMinimizedProjects((prev) => {
        if (prev.some((p) => p.id === selectedProject.id)) return prev;
        return [...prev, selectedProject];
      });
      setIsMaximized(false);
      closeProject();
    }
  }, [selectedProject, closeProject]);

  const handleToggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev);
  }, []);

  const handleRestoreProject = useCallback(
    (id: string) => {
      setMinimizedProjects((prev) => prev.filter((p) => p.id !== id));
      openProject(id);
    },
    [openProject],
  );

  const handleClose = useCallback(() => {
    setIsMaximized(false);
    closeProject();
  }, [closeProject]);

  useEffect(() => {
    if (!isDetailOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDetailOpen, handleClose]);

  const showDesktop = introDone;

  return (
    <div
      className={`relative min-h-dvh w-full overflow-hidden text-white home-screen bg-black`}
    >
      {!introDone && !skipIntro && (
        <HelloIntro onComplete={() => setIntroDone(true)} />
      )}

      {showDesktop && (
        <>
          <div
            className="home-screen__glow pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="home-screen__vignette pointer-events-none absolute inset-0"
            aria-hidden
          />
        </>
      )}

      <main
        className={`relative min-h-dvh w-full overflow-hidden transition-all duration-700 ${
          !showDesktop
            ? "pointer-events-none opacity-0"
            : isDetailOpen
              ? "pointer-events-none opacity-40"
              : "opacity-100"
        }`}
        aria-hidden={!showDesktop || isDetailOpen}
      >
        <div className="absolute right-3 top-3 z-20 flex flex-wrap items-center gap-2 sm:right-6 sm:top-6">
          <Link
            href="/portfolio"
            className="rounded-full border border-[#0886FD]/30 bg-black/45 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-[#0886FD] hover:bg-[#0886FD]/15"
          >
            See My Work
          </Link>
          <BookServiceButton className="px-3 py-2 text-sm" />
        </div>

        <div className="pointer-events-none flex min-h-[30vh] items-center justify-center pt-4 sm:min-h-[calc(100dvh-8rem)] sm:pt-8">
          <HeroLogo />
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 text-center sm:px-8">
          <div className="rounded-full border border-[#0886FD]/20 bg-[#0886FD]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#0886FD]">
            Creative direction • motion • branding
          </div>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Crafted visuals for launches, identities, and digital stories.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-zinc-400 sm:text-base">
            A polished, modern portfolio experience built around your work, your
            tone, and your next opportunity.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/portfolio"
              className="rounded-full bg-[#0886FD] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#066fce]"
            >
              See my work
            </Link>
            <BookServiceButton className="px-5 py-2.5 text-sm" />
          </div>
        </div>
      </main>

      {activeProject && showDesktop && (
        <div
          className={`fixed inset-0 z-20 flex justify-center transition-all duration-300 ${
            isWindowOpen ? "pointer-events-auto" : "pointer-events-none"
          } ${
            isMaximized
              ? "items-stretch"
              : "items-start overflow-y-auto px-4 pb-32 pt-10 sm:items-center sm:px-6 sm:py-16"
          }`}
        >
          <button
            type="button"
            className={`fixed inset-0 bg-black/25 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-300 ${
              isWindowOpen && !isMaximized
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={handleClose}
            aria-label="Close project"
          />
          <div
            className={`relative z-10 w-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isWindowOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-12"
            } ${isMaximized ? "h-full flex flex-col" : ""}`}
          >
            <ProjectWindow
              project={activeProject}
              onClose={handleClose}
              onMinimize={handleMinimize}
              onMaximize={handleToggleMaximize}
              isMaximized={isMaximized}
            />
          </div>
        </div>
      )}

      {isDetailOpen && selectedProject?.detail.instagramUrl && (
        <p className="fixed bottom-24 left-4 z-30 hidden max-w-md truncate text-[11px] text-white/50 sm:block">
          {selectedProject.detail.instagramUrl}
        </p>
      )}

      {showDesktop && (
        <Dock
          minimizedProjects={minimizedProjects}
          onRestoreProject={handleRestoreProject}
        />
      )}
    </div>
  );
}
