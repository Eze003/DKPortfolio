"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

export default function PortfolioGridSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch((err) => console.error("Failed to fetch projects", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative bg-[#050505] px-6 pb-24 pt-6 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-80 animate-pulse rounded-[28px] border border-white/10 bg-white/4"
              />
            ))
          : projects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.id}`}
                className="group block"
              >
                <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/80 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:border-[#10b981]/40">
                  <div className="relative h-72 overflow-hidden rounded-[22px] border border-white/10 bg-zinc-900">
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={project.label}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-linear-to-br from-[#10b981]/20 via-zinc-900 to-zinc-950">
                        <span className="text-4xl font-semibold uppercase tracking-[0.3em] text-[#10b981]">
                          {project.label.slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#10b981]">
                        {project.detail.projectType}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {project.label}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">
                        {project.detail.client}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
      </div>
    </section>
  );
}
