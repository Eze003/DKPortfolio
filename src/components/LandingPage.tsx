"use client";

import { useState, useEffect } from "react";
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
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { BookServiceButton } from "@/components/BookServiceButton";

/* ─── Inline brand-colored social icon squares ─── */
function GmailIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition hover:scale-105">
      <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
        <path fill="#EA4335" d="M24 24.7 4 12.8V38h40V12.8z" />
        <path fill="#FBBC05" d="M4 12.8l20 11.9 20-11.9V10H4z" />
        <path fill="#34A853" d="M44 12.8V38h4V14l-4-1.2z" />
        <path fill="#4285F4" d="M0 14v24h4V12.8L0 14z" />
        <path fill="#C5221F" d="M24 24.7 4 12.8 0 14l24 14 24-14-4-1.2z" />
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition hover:scale-105"
      style={{
        background:
          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-white"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </div>
  );
}

function WhatsappIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] shadow-sm transition hover:scale-105">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </div>
  );
}

function LinkedinIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0077b5] shadow-sm transition hover:scale-105">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-white"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    </div>
  );
}

function BehanceIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#053eff] shadow-sm transition hover:scale-105">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-white"
        aria-hidden="true"
      >
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.39-.42 1.93-.28.55-.67 1.01-1.16 1.36-.49.36-1.06.62-1.7.78-.64.17-1.31.25-2.02.25H0V4.503h6.938zm-.54 5.88c.54 0 .98-.13 1.32-.4.34-.26.51-.67.51-1.22 0-.3-.06-.56-.16-.76-.11-.2-.26-.36-.45-.48-.19-.12-.41-.21-.65-.26-.25-.05-.51-.07-.78-.07H3.16v3.19h3.24zm.15 6.15c.29 0 .57-.03.83-.09.26-.06.49-.16.69-.3.2-.14.36-.33.48-.57.12-.24.18-.54.18-.9 0-.72-.2-1.23-.6-1.55-.4-.31-.93-.47-1.59-.47H3.16v3.88h3.39zm11.17-9.3c-1.35 0-2.47.36-3.38 1.09-.91.73-1.4 1.82-1.47 3.28h7.8c-.1-1.49-.55-2.58-1.39-3.28-.83-.69-1.82-1.09-1.56-.09zM24 13.15c0 .07-.01.17-.02.29h-7.23c.12.74.42 1.28.91 1.64.49.36 1.1.54 1.81.54.65 0 1.2-.14 1.65-.42.44-.28.71-.56.81-.84h2.79c-.38 1.15-1.02 2.03-1.93 2.66-.91.62-2 .94-3.27.94-1.77 0-3.19-.55-4.28-1.64-1.09-1.09-1.63-2.59-1.63-4.5 0-1.88.53-3.37 1.61-4.48 1.07-1.1 2.49-1.65 4.25-1.65 1.74 0 3.14.56 4.22 1.67C23.49 8.49 24 10.55 24 13.15zm-6.29-6.18h-4.84v1.46h4.84V6.97z" />
      </svg>
    </div>
  );
}

export function LandingPage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(380);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setOrbitRadius(215);
      else if (w < 768) setOrbitRadius(290);
      else setOrbitRadius(385);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tools = [
    {
      icon: (
        <span className="font-bold text-base tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent select-none shrink-0">
          Canva
        </span>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiFigma className="w-5 h-5 text-[#0acf83]" />
          <span className="text-sm font-semibold text-zinc-300">Figma</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiAsana className="w-5 h-5 text-[#fc636b]" />
          <span className="text-sm font-semibold text-zinc-300">asana</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiSlack className="w-5 h-5 text-[#3eb991]" />
          <span className="text-sm font-semibold text-zinc-300">Slack</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiDropbox className="w-5 h-5 text-[#0061ff]" />
          <span className="text-sm font-semibold text-zinc-300">Dropbox</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiAirtable className="w-5 h-5 text-[#f82b60]" />
          <span className="text-sm font-semibold text-zinc-300">Airtable</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiSpotify className="w-5 h-5 text-[#1ed760]" />
          <span className="text-sm font-semibold text-zinc-300">Spotify</span>
        </div>
      ),
    },
  ];

  const brandLogos = [
    { icon: <SiSpotify className="w-7 h-7" />, name: "Spotify" },
    { icon: <SiNetflix className="w-7 h-7" />, name: "Netflix" },
    { icon: <SiSlack className="w-7 h-7" />, name: "Slack" },
    { icon: <SiFigma className="w-7 h-7" />, name: "Figma" },
    { icon: <FaMicrosoft className="w-6 h-6" />, name: "Microsoft" },
    { icon: <SiGoogle className="w-6 h-6" />, name: "Google" },
  ];

  const coreServices = [
    {
      title: "Motion graphics",
      desc: "Dynamic visual animations, kinetic typography, and custom high-impact promos.",
      seed: "motion",
    },
    {
      title: "Video editing",
      desc: "Paced storytelling edits, professional color grading, and immersive sound design.",
      seed: "video",
    },
    {
      title: "Social media content",
      desc: "Scroll-stopping vertical video ads, custom Instagram Reels, and viral layouts.",
      seed: "social",
    },
    {
      title: "3d Ai video",
      desc: "Futuristic generative AI video layouts and abstract 3D visual loop rendering.",
      seed: "3dai",
    },
  ];

  const socials = [
    {
      icon: <GmailIcon />,
      label: "Gmail",
      href: "mailto:hello@motionsgaad.com",
    },
    {
      icon: <InstagramIcon />,
      label: "Instagram",
      href: "https://www.instagram.com/yernazar.design/",
    },
    {
      icon: <WhatsappIcon />,
      label: "Whatsapp",
      href: "https://wa.me/5551234567",
    },
    { icon: <LinkedinIcon />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <BehanceIcon />, label: "Behance", href: "https://behance.net" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-white selection:bg-[#0886FD]/30 overflow-x-hidden font-sans pb-20">
      {/* Background Radial Glow Blobs for Glassmorphism */}
      <div className="pointer-events-none absolute left-1/2 top-[22%] -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0886FD]/15 blur-[100px] sm:h-[800px] sm:w-[800px]" />
      <div className="pointer-events-none absolute left-[-10%] top-[45%] -z-10 h-[500px] w-[500px] rounded-full bg-[#0886FD]/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[70%] -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[110px]" />

      {/* ── Main Content ── */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 sm:pt-12">
        {/* ── Hero Section (Centered Avatar with Text Overlay) ── */}
        <section className="flex flex-col items-center justify-center w-full py-4 text-center">
          <div className="relative w-[240px] h-[260px] sm:w-[280px] sm:h-[300px] md:w-[320px] md:h-[340px]">
            {/* Soft backdrop glow */}
            <div className="absolute inset-[-20px] rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-[radial-gradient(ellipse_at_center,rgba(8,134,253,0.22)_0%,rgba(8,134,253,0.08)_50%,transparent_70%)] blur-[30px] -z-10" />

            <Image
              src="/ivan_avatar.png"
              alt="Dike Character Avatar"
              fill
              className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] select-none"
              priority
            />
            {/* RENCE / DIKE overlay on chest */}
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none">
              <span className="text-[#0886FD] tracking-[0.55em] text-[9px] font-black uppercase drop-shadow">
                R E N C E
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-metallic -mt-1 select-none">
                DIKE
              </h1>
            </div>
          </div>
        </section>

        {/* ── Spinning Circle Arc ── */}
        <div
          className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-2 mb-0 z-10"
          style={{ height: `${Math.round(orbitRadius * 0.42)}px` }}
        >
          {/* Rotating elements container */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: `${Math.round(orbitRadius * 1.0)}px`,
              width: 0,
              height: 0,
              transform: "translateX(-50%)",
            }}
          >
            {/* The Spinning Wheel (Rotates as a single cohesive unit) */}
            <div
              className="animate-orbit-spin"
              style={{
                position: "relative",
                width: 0,
                height: 0,
              }}
            >
              {/* Rotating Curved Banner Track (Subtle dark glass ribbon) */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${orbitRadius * 2}px`,
                  height: `${orbitRadius * 2}px`,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  boxSizing: 'border-box',
                  border: '36px solid rgba(255, 255, 255, 0.04)',
                  borderColor: 'rgba(255, 255, 255, 0.01) rgba(255, 255, 255, 0.04) rgba(255, 255, 255, 0.04) rgba(255, 255, 255, 0.04)',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8), 0 3px 10px rgba(0, 0, 0, 0.6)',
                  pointerEvents: 'none',
                }}
              />

              {/* 2 copies of tools — 14 items spread around the 360° circle */}
              {[...tools, ...tools].map((tool, idx) => {
                const total = tools.length * 2;
                const angle = (idx / total) * 360;
                return (
                  <div
                    key={`orbit-${idx}`}
                    style={{
                      position: "absolute",
                      width: 0,
                      height: 0,
                      left: 0,
                      top: 0,
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    {/* Arm: push item outward along the rotated axis to sit on the banner center */}
                    <div
                      style={{
                        position: "absolute",
                        transform: `translateY(-${orbitRadius - 18}px) translateX(-50%)`,
                      }}
                    >
                      {/* No counter-rotation — items tilt/curve along with the banner! */}
                      <div className="flex items-center justify-center text-white px-2 select-none whitespace-nowrap">
                        {tool.icon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Cinematic Widescreen Video Player ── */}
        <section className="-mt-2 sm:-mt-8 w-full max-w-3xl mx-auto px-2 z-20 relative">
          <div
            onClick={() => setIsPlayModalOpen(true)}
            className="group relative aspect-video w-full rounded-[28px] overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl cursor-pointer hover:border-[#0886FD]/40 transition-all duration-500 shadow-black/80 hover:shadow-[0_12px_40px_rgba(8,134,253,0.1)]"
          >
            {/* Ambient Background Video Loop */}
            <video
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d823f90463fe04d593c6e7c1eb&profile_id=139&oauth2_token_id=57447761"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.02] transition-transform duration-700"
            />

            {/* Glass Vignette/Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#0886FD] group-hover:border-[#0886FD] group-hover:text-black group-hover:scale-110 shadow-lg group-hover:shadow-[0_0_30px_rgba(8,134,253,0.4)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 sm:h-8 sm:w-8 fill-current ml-1"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Bottom Left Reel Badge */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0886FD] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                DIKE SHOWREEL
              </span>
            </div>
          </div>
        </section>

        {/* ── Statement & Brands Panel ── */}
        <section className="mt-4 w-full max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight max-w-2xl mx-auto">
            Crafting incredible, impactful designs & brand experiences
          </h3>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto">
            Design is a way of telling a brand&apos;s story, communicating
            ideas, identifying real problems, and providing solutions. Crafting
            memorable designs is what I do very well.
          </p>

          {/* Glass enclosed panel for Brand logos */}
          <div className="mt-3 rounded-[24px] border border-[#0886FD]/20 bg-gradient-to-br from-[#0886FD]/12 via-zinc-900/50 to-violet-900/10 backdrop-blur-lg px-6 py-4 shadow-[0_8px_30px_rgba(8,134,253,0.08)]">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Brands I worked with
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center justify-items-center opacity-40 hover:opacity-60 transition-opacity duration-300">
              {brandLogos.map((b, i) => (
                <div
                  key={i}
                  className="text-zinc-400 hover:text-white transition-colors duration-200"
                  title={b.name}
                >
                  {b.icon}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── "What I Do" Services Grid (2x2 Layout) ── */}
        <section id="what-i-do" className="mt-8 w-full max-w-3xl mx-auto">
          <div className="flex justify-between items-end mb-4 px-2">
            <h4 className="text-2xl font-bold text-white tracking-tight">
              what I do
            </h4>
            <span className="text-xs text-[#0886FD] font-semibold tracking-widest uppercase">
              Services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreServices.map((s, idx) => (
              <Link
                key={idx}
                href="/portfolio"
                className="group flex flex-col justify-between p-5 bg-gradient-to-br from-[#0886FD]/12 via-zinc-900/50 to-purple-950/20 border border-white/15 hover:border-[#0886FD]/40 rounded-2xl transition-all duration-300 backdrop-blur-lg hover:shadow-[0_12px_40px_rgba(8,134,253,0.1)] hover:-translate-y-0.5"
              >
                <div className="flex gap-4">
                  {/* Small visual thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-zinc-950">
                    <Image
                      src={`https://picsum.photos/seed/${s.seed}/120/120`}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-200 group-hover:text-white uppercase tracking-wider">
                      {s.title}
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <span className="text-[10px] tracking-wider text-zinc-500 group-hover:text-[#0886FD] font-bold uppercase transition-colors mr-2">
                    View projects
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0886FD]/15 text-[#0886FD] group-hover:bg-[#0886FD] group-hover:text-black transition-all duration-300 text-xs font-bold shadow-sm">
                    ➔
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Contact Me ── */}
        <section className="mt-8 w-full text-center">
          <h4 className="text-xl font-bold text-white mb-4">Contact me</h4>

          {/* Social icons in a single row premium glass pill */}
          <div className="mx-auto w-fit rounded-full border border-white/15 bg-gradient-to-br from-[#0886FD]/10 via-zinc-950/60 to-purple-950/10 backdrop-blur-lg px-6 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:border-[#0886FD]/40 transition-colors duration-300">
            <div className="flex items-center gap-5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 group"
                  title={s.label}
                >
                  <div className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <span className="text-[9px] text-zinc-500 font-semibold tracking-wide group-hover:text-zinc-300 transition-colors hidden sm:block">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Lightbox Full-screen Video Modal ── */}
      {isPlayModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md">
          {/* Backdrop close button */}
          <button
            onClick={() => setIsPlayModalOpen(false)}
            className="absolute top-4 right-6 text-white text-5xl font-light hover:text-[#0886FD] transition duration-200 z-[120] p-2"
            aria-label="Close video showreel"
          >
            &times;
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
            <video
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d823f90463fe04d593c6e7c1eb&profile_id=139&oauth2_token_id=57447761"
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
