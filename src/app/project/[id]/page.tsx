"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PortfolioVideoPlayer } from "@/components/ui/PortfolioVideoPlayer";
import { IoChevronBackCircle } from "react-icons/io5";
import { Footer } from "@/components/Footer";
import { usePublicProjects } from "@/hooks/usePublicProjects";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { projects, isLoading, error } = usePublicProjects();
  const project = projects.find((item) => item.id === id);

  useEffect(() => {
    if (!isLoading && !error && id && !project) {
      router.replace("/projects");
    }
  }, [error, id, isLoading, project, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black px-6 pt-32 text-center text-red-300">
        {error}
      </div>
    );
  }

  if (!project) return null;

  const title = project.label;
  const year = project.detail.year;
  const projectType = project.detail.projectType;
  const client = project.detail.client;
  const description = project.detail.description;
  const gallery = project.detail.gallery;

  return (
    <div className="min-h-screen bg-[#080808] pt-24  overflow-x-hidden relative text-white">
      {/* ── Main Background Ambient Video ── */}
      {/* <div className="pointer-events-none fixed inset-0 overflow-hidden z-0"> */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.webp"
        preload="auto"
        className="h-full w-full object-cover opacity-75 transform-gpu"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video> */}
      {/* Soft Vignette Overlay for Text Readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/40 to-[#030303]" /> */}
      {/* </div> */}

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Back button */}
          <div className="mb-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              <IoChevronBackCircle className="h-5 w-5 text-primary-500" />
              <span>Back to projects</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10 md:gap-8">
            {/* Left Section */}
            <div className="flex flex-col md:w-[60%] relative group">
              <div className="inline-flex items-center gap-3 px-1 py-1 rounded-full bg-[#111] border border-white/5 w-fit mb-6 relative overflow-hidden shadow-[0_0_30px_-10px_rgba(0,85,255,0.3)]">
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(0, 85, 255, 0.2) 171.892deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)",
                  }}
                />

                <span className="relative z-10 px-3 py-1 rounded-full bg-gradient-to-b from-primary-500 to-primary-700 text-[10px] font-bold text-white uppercase tracking-wider shadow-[inset_0_1px_rgba(255,255,255,0.2)]">
                  YEAR
                </span>
                <span className="relative z-10 text-sm font-medium text-white/80 pr-4">
                  {year}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-medium mb-6 leading-[1.08] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                {title}
              </h1>

              {description && (
                <p className="text-white/60 text-base md:text-[17px] max-w-xl leading-relaxed">
                  {description}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-8">
                {projectType && (
                  <div className="relative px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[15px] text-white/80 overflow-hidden hover:bg-white/10 transition-colors backdrop-blur-sm shadow-[0_0_25px_-10px_rgba(0,85,255,0.2)]">
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background:
                          "conic-gradient(rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(0, 85, 255, 0.2) 171.892deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)",
                      }}
                    />
                    {projectType}
                  </div>
                )}
                {client && (
                  <div className="relative px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[15px] text-white/80 overflow-hidden hover:bg-white/10 transition-colors backdrop-blur-sm shadow-[0_0_25px_-10px_rgba(0,85,255,0.2)]">
                    Client: {client}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Collage / Media Reel */}
        {gallery.length > 0 && (
          <div className="w-full relative mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 w-full">
              {gallery.map((media, i) => {
                const span = media.span || 12;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05 }}
                    className="group relative"
                    style={{
                      gridColumn: `span ${span}`,
                    }}
                  >
                    {/* Backlight Glow */}
                    <div className="absolute -inset-4 bg-primary-500/15 blur-[40px] rounded-xl opacity-100" />

                    <div
                      className={`relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-[0_0_40px_-12px_rgba(0,85,255,0.2)] ${span === 12
                        ? "aspect-video"
                        : span >= 6
                          ? "aspect-[4/3]"
                          : "aspect-square"
                        }`}
                    >
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none z-10"
                        style={{
                          background:
                            "conic-gradient(rgba(255, 255, 255, 0.1) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(0, 85, 255, 0.1) 171.892deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)",
                        }}
                      />

                      {media.src &&
                      (media.type === "video" ||
                        /\.(mp4|mov|webm|ogg|avi)$/i.test(media.src) ||
                        media.src.includes("/video/")) ? (
                        <PortfolioVideoPlayer
                          src={media.src}
                          className="w-full h-full"
                        />
                      ) : media.src ? (
                        <Image
                          src={media.src}
                          alt={media.alt || `${title} Media ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes={
                            span === 12
                              ? "1200px"
                              : span === 6
                                ? "800px"
                                : "400px"
                          }
                        />
                      ) : (
                        <div
                          className={`h-full w-full ${media.placeholderClassName ?? "bg-zinc-900"}`}
                          aria-label={media.alt}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
