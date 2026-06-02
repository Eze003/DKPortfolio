"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import { DesktopIconGrid } from "@/components/DesktopIconGrid";
import { Dock } from "@/components/Dock";
import { HelloIntro } from "@/components/HelloIntro";
import { HeroLogo } from "@/components/HeroLogo";
import { ProjectWindow } from "@/components/ProjectWindow";

export function PortfolioShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const selectedProject = useMemo(
    () => (projectId ? getProjectById(projectId) : undefined),
    [projectId],
  );
  const isDetailOpen = Boolean(selectedProject);
  const skipIntro = Boolean(projectId);
  const [introDone, setIntroDone] = useState(skipIntro);

  const openProject = useCallback(
    (id: string) => {
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

  useEffect(() => {
    if (!isDetailOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDetailOpen, closeProject]);

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
        className={`relative min-h-dvh w-full transition-all duration-700 ${
          !showDesktop
            ? "pointer-events-none opacity-0"
            : isDetailOpen
              ? "pointer-events-none opacity-40"
              : "opacity-100"
        }`}
        aria-hidden={!showDesktop || isDetailOpen}
      >
        <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center pb-32 pt-8">
          <HeroLogo />
        </div>
        <DesktopIconGrid projects={projects} onOpen={openProject} />
      </main>

      {selectedProject && showDesktop && (
        <div className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto px-4 pb-32 pt-10 sm:items-center sm:px-6 sm:py-16">
          <button
            type="button"
            className="fixed inset-0 bg-black/25 backdrop-blur-md backdrop-saturate-150"
            onClick={closeProject}
            aria-label="Close project"
          />
          <div className="relative z-10 w-full">
            <ProjectWindow project={selectedProject} onClose={closeProject} />
          </div>
        </div>
      )}

      {isDetailOpen && selectedProject?.detail.instagramUrl && (
        <p className="fixed bottom-24 left-4 z-30 hidden max-w-md truncate text-[11px] text-white/50 sm:block">
          {selectedProject.detail.instagramUrl}
        </p>
      )}

      {showDesktop && <Dock />}
    </div>
  );
}
