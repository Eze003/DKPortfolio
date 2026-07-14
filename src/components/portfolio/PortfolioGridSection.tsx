"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <>
      <section className="relative w-full bg-black pb-24 pt-6 overflow-hidden">
        {/* Volumetric splashes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-primary-500/30 to-transparent blur-[60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[4/3] p-[6px] md:p-2 rounded-md bg-black border border-white/[0.04] shadow-2xl"
                  >
                    <div className="w-full h-full bg-black rounded-md border border-primary-500/30 animate-pulse" />
                  </div>
                ))
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative w-full aspect-[4/3] p-[6px] md:p-2 rounded-md bg-black border border-white/[0.04] shadow-2xl transition-transform duration-500 group cursor-pointer hover:-translate-y-1"
                  >
                    <div className="relative w-full h-full bg-black rounded-md border border-primary-500/30 shadow-[inset_0_0_40px_rgba(8,134,253,0.15),0_0_20px_rgba(8,134,253,0.1)] group-hover:border-primary-500/50 group-hover:shadow-[inset_0_0_60px_rgba(8,134,253,0.25),0_0_30px_rgba(8,134,253,0.2)] transition-all duration-500 overflow-hidden">
                      {/* Card Ambient Glow */}
                      <div className="absolute -inset-px bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                      {/* Image Background */}
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.label}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-500/20 via-zinc-900 to-zinc-950">
                          <span className="text-4xl font-semibold uppercase tracking-[0.3em] text-primary-500">
                            {project.label.slice(0, 2)}
                          </span>
                        </div>
                      )}

                      {/* The Hover Reveal Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                      {/* Details Content (Translates UP on Hover) */}
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                        <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-1 block">
                          {project.detail.projectType}
                        </span>
                        <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-tight text-shadow-sm">
                          {project.label}
                        </h3>

                        <div className="flex items-center justify-between">
                          <p className="text-white/90 text-sm md:text-[14px] font-medium">
                            {project.detail.client}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-white/20 font-bold uppercase tracking-widest">
                  No Projects Found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
