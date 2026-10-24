"use client";

import Image from "next/image";
import Link from "next/link";
import { PROJECT_CARD_ASPECT_CLASSES } from "@/data/projects";
import { usePublicProjects } from "@/hooks/usePublicProjects";

export default function ProjectsShowcase() {
  const { projects, isLoading, error } = usePublicProjects();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12" aria-label="Loading projects">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="rounded-[30px] sm:rounded-[34px] border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-6"
          >
            <div className="aspect-[4/3] sm:aspect-[16/10] min-h-[285px] sm:min-h-[330px] md:min-h-[400px] rounded-[22px] sm:rounded-[26px] bg-white/[0.06] animate-pulse" />
            <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="w-full space-y-3">
                <div className="h-7 w-2/3 rounded bg-white/[0.08] animate-pulse" />
                <div className="h-4 w-1/3 rounded bg-white/[0.05] animate-pulse" />
              </div>
              <div className="h-11 w-36 rounded-full bg-white/[0.06] animate-pulse shrink-0" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-300">{error}</p>;
  }

  if (projects.length === 0) {
    return <p className="text-sm text-zinc-400">No projects published yet.</p>;
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={`/project/${project.id}`}
          className="group relative flex flex-col rounded-[30px] sm:rounded-[34px] border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-6.5 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f] no-underline"
        >
          <div className={`relative w-full overflow-hidden rounded-[22px] sm:rounded-[26px] bg-[#161616] ${PROJECT_CARD_ASPECT_CLASSES[project.variant]}`}>
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.label}
                fill
                priority={index === 0}
                sizes="(max-width: 870px) 100vw, 870px"
                className="object-cover transition-transform duration-500 ease-out sm:group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                <span className="text-5xl font-semibold text-white/50">
                  {project.label.slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug mb-1">
                {project.label}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-normal m-0">
                {project.detail.projectType}
              </p>
            </div>
            <span className="inline-flex items-center justify-center rounded-full bg-[#181818] border border-white/[0.08] px-5 py-2.5 text-sm sm:text-base font-semibold text-white/95 shrink-0 transition-colors duration-200 group-hover:bg-[#222222] group-hover:border-white/15">
              View Project
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
