"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SiSpotify,
  SiNetflix,
  SiSlack,
  SiFigma,
  SiGoogle,
  SiAsana,
  SiDropbox,
  SiAirtable,
  SiNotion,
  SiFramer,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { projects } from "@/data/projects";
import { Footer } from "@/components/Footer";

/* ─── Brand logos for marquee ─── */
const brandLogos = [
  { icon: <SiSpotify />, name: "Spotify" },
  { icon: <SiNetflix />, name: "Netflix" },
  { icon: <SiSlack />, name: "Slack" },
  { icon: <SiFigma />, name: "Figma" },
  { icon: <FaMicrosoft />, name: "Microsoft" },
  { icon: <SiGoogle />, name: "Google" },
  { icon: <SiDropbox />, name: "Dropbox" },
  { icon: <SiAirtable />, name: "Airtable" },
  { icon: <SiAsana />, name: "Asana" },
  { icon: <SiNotion />, name: "Notion" },
  { icon: <SiFramer />, name: "Framer" },
];

/* ─── Experience data ─── */
const experiences = [
  {
    role: "Senior Motion Designer",
    period: "2024 – Present",
    company: "MotionsGaad Studio",
    desc: "3D animation, motion graphics & brand films",
    abbr: "MG",
    color: "#1a1a2e",
  },
  {
    role: "Motion Graphics Artist",
    period: "2022 – 2024",
    company: "DFC Creative",
    desc: "Event visuals, fighter promos & broadcast packages",
    abbr: "DC",
    color: "#1a1a1a",
  },
  {
    role: "Video Editor",
    period: "2021 – 2022",
    company: "Skin.Club",
    desc: "Product reels, neon-lit social loops & renders",
    abbr: "SC",
    color: "#1a1a1a",
  },
  {
    role: "Junior Designer",
    period: "2020 – 2021",
    company: "Freelance",
    desc: "Brand identity, social content & packaging",
    abbr: "FL",
    color: "#1a1a1a",
  },
];

export function LandingPage() {
  /* take up to 4 projects for the homepage grid */
  const featuredProjects = projects.slice(0, 4);

  return (
    <div
      style={{
        background: "#080808",
        color: "#fffc",
        fontFamily: "'Manrope', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#000",
          overflow: "hidden",
        }}
      >
        {/* ── DESKTOP: Portrait photo centered, not full-bleed ── */}
        <div
          className="hidden sm:flex"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(52vw, 620px)",
              height: "100%",
              flexShrink: 0,
            }}
          >
            <Image
              src="/avatar.png"
              alt="DIKE"
              fill
              priority
              sizes="620px"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                maskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.5) 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.5) 78%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* ── MOBILE: Full-bleed portrait photo top half ── */}
        <div
          className="sm:hidden"
          style={{
            position: "relative",
            width: "100%",
            height: "62vh",
            zIndex: 1,
          }}
        >
          <Image
            src="/avatar.png"
            alt="DIKE"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              maskImage: "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.4) 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.4) 85%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Desktop vignette ── */}
        <div
          className="hidden sm:block"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background: [
              "linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 20%, transparent 40%)",
              "linear-gradient(to left,  #000 0%, rgba(0,0,0,0.6) 20%, transparent 40%)",
              "linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 20%, transparent 45%)",
            ].join(", "),
          }}
        />

        {/* ── DESKTOP: bottom overlay (left title + right description/CV) ── */}
        <div className="hidden sm:block absolute bottom-36 left-0 right-0 z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full flex items-end justify-between">
            <div className="pointer-events-auto">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#121212]/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/75 backdrop-blur-md">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-[#22c55e]"
                  style={{ boxShadow: "0 0 8px #22c55e", animation: "pulseDot 2s ease-in-out infinite" }}
                />
                Available to work
              </div>
              <p className="m-0 max-w-[280px] text-[22px] font-semibold leading-snug text-white/90">
                Motion Designer &amp; Visual<br />Storyteller based in UK
              </p>
            </div>
            <div className="pointer-events-auto max-w-[360px] text-right flex flex-col items-end">
              <p className="mb-6 text-[15px] sm:text-[16px] leading-relaxed text-white/70">
                As a motion designer, I specialize in creating magical visual identities for brands.
                Great design starts with open communication and respect for your audience.
              </p>
              <a
                href="/cv.pdf"
                download
                className="group inline-flex items-center gap-3.5 rounded-full bg-white pl-6 pr-2 py-2 text-sm font-semibold text-black shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Download CV</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 group-hover:translate-y-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── MOBILE: stacked text content below photo ── */}
        <div className="sm:hidden relative z-10 px-5 pt-5 pb-10">
          {/* Availability badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#121212]/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/75 backdrop-blur-md">
            <span
              className="inline-block h-2 w-2 rounded-full bg-[#22c55e]"
              style={{ boxShadow: "0 0 8px #22c55e", animation: "pulseDot 2s ease-in-out infinite" }}
            />
            Available to work
          </div>
          {/* Title */}
          <h1 className="text-[28px] font-semibold leading-tight text-white mb-4">
            Motion Designer &amp; Visual<br />Storyteller based in UK
          </h1>
          {/* Description */}
          <p className="text-[15px] leading-relaxed text-white/60 mb-6">
            As a motion designer, I specialize in creating magical visual identities for brands.
            Great design starts with open communication and respect for your audience.
          </p>
          {/* Download CV button */}
          <a
            href="/cv.pdf"
            download
            className="group inline-flex items-center gap-3 rounded-full bg-white pl-5 pr-2 py-2 text-sm font-semibold text-black shadow-xl transition-all duration-200 active:scale-[0.98]"
          >
            <span>Download CV</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
          </a>

          {/* DIKE name — mobile */}
          <div
            style={{
              marginTop: 24,
              textAlign: "left",
              fontSize: "clamp(72px, 22vw, 120px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "#fffc",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            DIKE
          </div>
        </div>

        {/* ── DESKTOP: HUGE name at the very bottom ── */}
        <div
          className="hidden sm:block"
          style={{
            position: "absolute",
            bottom: -20,
            left: 0,
            right: 0,
            zIndex: 5,
            textAlign: "center",
            fontSize: "clamp(90px, 18vw, 220px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            color: "#fffc",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          DIKE
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRAND LOGOS MARQUEE (MY EXPERT AREA)
      ═══════════════════════════════════════════ */}
      <section className="bg-[#080808] pt-5 sm:pt-7 pb-14 sm:pb-16 border-t border-white/[0.05] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full">
          {/* Label */}
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#141414] px-4 py-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
              MY EXPERT AREA
            </div>
          </div>

          {/* Scrolling large cards aligned within the page px */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div
              className="flex gap-4 w-max hover:[animation-play-state:paused]"
              style={{
                animation: "marqueeSpin 95s linear infinite",
              }}
            >
              {[...brandLogos, ...brandLogos, ...brandLogos].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-3.5 w-[210px] sm:w-[240px] h-[135px] sm:h-[155px] shrink-0 rounded-2xl bg-[#141414] border border-white/[0.08] text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-[#181818]"
                >
                  <span className="text-2xl sm:text-3xl text-zinc-300 flex items-center">
                    {b.icon}
                  </span>
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white/90">
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROJECTS SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="projects"
        className="bg-[#080808] py-20 border-t border-white/[0.05]"
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full">
          {/* Section heading */}
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "#fffc",
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}
          >
            Projects
          </h2>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9">
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                href={`/project/${p.id}`}
                className="group relative flex flex-col rounded-[30px] sm:rounded-[34px] border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f] no-underline"
              >
                {/* Balanced thumbnail height */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[285px] sm:min-h-[300px] md:min-h-[340px] overflow-hidden rounded-[22px] sm:rounded-[24px] bg-[#161616]">
                  <Image
                    src={
                      p.thumbnail ||
                      `https://picsum.photos/seed/${p.id}/800/500`
                    }
                    alt={p.label}
                    fill
                    sizes="(max-width:768px) 100vw, 650px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Card footer: Name and description */}
                <div className="mt-5 px-1">
                  <h3 className="text-xl sm:text-2xl md:text-[25px] font-bold text-white tracking-tight leading-snug mb-1.5 transition-colors duration-200 group-hover:text-white">
                    {p.label}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 font-medium m-0">
                    {p.detail.projectType}
                  </p>
                </div>

                {/* Button placed close below description */}
                <div className="mt-4 px-1 flex items-center justify-end">
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#181818] border border-white/[0.08] pl-5 sm:pl-6 pr-2 sm:pr-2.5 py-2.5 text-sm sm:text-base font-semibold text-white/95 shrink-0 transition-colors duration-200 group-hover:bg-[#222222] group-hover:border-white/15">
                    <span>View Project</span>
                    <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-black shrink-0 overflow-hidden">
                      {/* Straight right arrow (rotates CLOCKWISE +45° and fades out) */}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute transition-all duration-300 ease-out opacity-100 rotate-0 scale-100 group-hover:opacity-0 group-hover:rotate-45 group-hover:scale-50"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {/* Right diagonal arrow (starts at -45° and rotates CLOCKWISE to 0°) */}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute transition-all duration-300 ease-out opacity-0 -rotate-45 scale-50 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 52, display: "flex", justifyContent: "center" }}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3.5 rounded-full border border-white/12 bg-[#121212] pl-6 pr-2.5 py-2.5 text-sm sm:text-base font-semibold text-white/80 transition-all duration-200 hover:border-white/30 hover:text-white hover:bg-[#181818]"
            >
              <span>View all projects</span>
              <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute transition-all duration-300 ease-out opacity-100 rotate-0 scale-100 group-hover:opacity-0 group-hover:rotate-45 group-hover:scale-50"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute transition-all duration-300 ease-out opacity-0 -rotate-45 scale-50 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERIENCE SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="experience"
        className="bg-[#080808] py-20 border-t border-white/[0.05]"
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-10">
            Experience
          </h2>

          {/* 2×2 grid matching Image 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                role: "Senior Frontend Engineer",
                period: "2024 – Present",
                desc: "Product Designer NovaTech",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-zinc-300">
                    <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="6" />
                    <circle cx="24" cy="24" r="8" fill="currentColor" />
                  </svg>
                ),
              },
              {
                role: "Frontend Developer",
                period: "2022 – 2024",
                desc: "Developed responsive websites",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-zinc-300">
                    <path
                      d="M14 26c0-6.6 5.4-12 12-12s12 4.5 12 10-3.5 8-8.5 8c-7 0-14.5-5.5-14.5-15 0-7.5 6.5-13 14.5-13s14.5 5.5 14.5 14.5"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                role: "Frontend Engineer — BrightLabs",
                period: "2021 – 2022",
                desc: "Created reusable component libraries",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-zinc-300">
                    <path
                      d="M24 7L11 14.5v19L24 41l13-7.5v-19L24 7z"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                    <path d="M11 14.5l13 7.5 13-7.5M24 22v19" stroke="currentColor" strokeWidth="5" />
                  </svg>
                ),
              },
              {
                role: "Junior Frontend Developer",
                period: "2020 – 2021",
                desc: "Junior Designer CodeWorks",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-zinc-300">
                    <path
                      d="M13 33c7 0 17-5 17-17 0-5.5-3.5-9-9-9s-9 3.5-9 9"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M35 15c-7 0-17 5-17 17 0 5.5 3.5 9 9 9s9-3.5 9-9"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
            ].map((e, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-white/[0.08] bg-[#0c0c0c] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f]"
              >
                {/* Rounded Icon */}
                <div className="w-[62px] h-[62px] sm:w-[82px] sm:h-[82px] rounded-[20px] sm:rounded-[22px] bg-[#1c1c1c] border border-white/[0.06] flex items-center justify-center shrink-0 p-3">
                  {e.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-[22px] font-semibold text-white tracking-tight leading-snug mb-1">
                    {e.role}
                  </h3>
                  <div className="text-sm sm:text-base text-zinc-400 font-normal mb-1.5">
                    {e.period}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-500 font-normal">
                    {e.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Download CV button */}
          <div className="mt-12 sm:mt-14 flex justify-center">
            <a
              href="/cv.pdf"
              download
              className="group inline-flex items-center gap-3.5 rounded-full bg-white pl-6 pr-2 py-2 text-sm sm:text-base font-semibold text-black shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Download CV</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 group-hover:translate-y-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS SECTION (Image 2) - COMMENTED OUT
      ═══════════════════════════════════════════ */}
      {/* <section
        id="testimonials"
        className="bg-[#080808] pt-16 sm:pt-20 pb-12 sm:pb-14 border-t border-white/[0.05]"
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-10">
            Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            <div className="rounded-[32px] sm:rounded-[36px] border border-white/[0.08] bg-[#0c0c0c] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/20">
              <div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] overflow-hidden mb-6 border border-white/[0.08] bg-zinc-800 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                    alt="Emily Carter"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1">
                  Emily Carter
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 font-normal mb-6">
                  Founder &amp; CEO, NovaTech
                </p>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal m-0">
                  &ldquo;Working with this team completely transformed our online presence. The design is clean, intuitive, and perfectly reflects our brand. We’ve received incredible feedback from both customers and partners.&rdquo;
                </p>
              </div>
            </div>

            <div className="rounded-[32px] sm:rounded-[36px] border border-white/[0.08] bg-[#0c0c0c] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/20">
              <div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] overflow-hidden mb-6 border border-white/[0.08] bg-zinc-800 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                    alt="Michael Johnson"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1">
                  Michael Johnson
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 font-normal mb-6">
                  Marketing Director, BrightEdge
                </p>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal m-0">
                  &ldquo;From concept to launch, every detail was handled with professionalism. The final product exceeded our expectations, and the user experience has significantly improved customer engagement.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ═══════════════════════════════════════════
          FOOTER SECTION
      ═══════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
