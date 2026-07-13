"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Project } from "@/data/projects";
import { IoChevronBackCircle } from "react-icons/io5";

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const match = data.find((item: Project) => item.id === id);
          if (match) {
            setProject(match);
          } else {
            router.push("/portfolio");
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch project", err);
        router.push("/portfolio");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#10b981]/30 border-t-[#10b981]" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 mt-10">
        <nav className="flex items-center justify-between">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            <IoChevronBackCircle className="h-5 w-5 text-[#10b981]" />
            <span>Back to portfolio</span>
          </Link>

        </nav>

        <section className="grid gap-8 rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#10b981]">
                {project.detail.projectType}
              </p>
              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                {project.label}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
                {project.detail.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Client: {project.detail.client}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Year: {project.detail.year}
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black">
            {project.thumbnail ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.thumbnail}
                  alt={project.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#10b981]/20 via-zinc-900 to-zinc-950">
                <span className="text-5xl font-semibold uppercase tracking-[0.3em] text-[#10b981]">
                  {project.label.slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </section>

        {project.detail.gallery?.length ? (
          <section className="grid gap-4 md:grid-cols-2">
            {project.detail.gallery.map((image, index) => (
              <div
                key={`${image.alt}-${index}`}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950/70"
              >
                {image.src ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-zinc-900 text-sm text-zinc-400">
                    Preview unavailable
                  </div>
                )}
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
