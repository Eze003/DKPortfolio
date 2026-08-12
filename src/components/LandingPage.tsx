"use client";

import { useState, useEffect, useRef } from "react";
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
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const cardVideoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const playVideo = (v: HTMLVideoElement | null) => {
      if (v) {
        v.muted = true;
        v.loop = true;
        v.play().catch(() => { });
      }
    };
    playVideo(bgVideoRef.current);
    playVideo(cardVideoRef.current);
  }, []);

  const tools = [
    {
      icon: (
        <span className="font-bold text-xl tracking-tight text-zinc-400 select-none shrink-0">
          Canva
        </span>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiFigma className="w-7 h-7 text-zinc-400" />
          <span className="text-base font-semibold text-zinc-400">Figma</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiAsana className="w-7 h-7 text-zinc-400" />
          <span className="text-base font-semibold text-zinc-400">Asana</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiSlack className="w-7 h-7 text-zinc-400" />
          <span className="text-base font-semibold text-zinc-400">Slack</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiDropbox className="w-7 h-7 text-zinc-400" />
          <span className="text-base font-semibold text-zinc-400">Dropbox</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiAirtable className="w-7 h-7 text-zinc-400" />
          <span className="text-base font-semibold text-zinc-400">Airtable</span>
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center gap-1.5 shrink-0">
          <SiSpotify className="w-7 h-7 text-zinc-400" />
          <span className="text-base font-semibold text-zinc-400">Spotify</span>
        </div>
      ),
    },
  ];

  const brandLogos = [
    { icon: <SiSpotify className="w-7 h-7 text-zinc-400" />, name: "Spotify" },
    { icon: <SiNetflix className="w-7 h-7 text-zinc-400" />, name: "Netflix" },
    { icon: <SiSlack className="w-7 h-7 text-zinc-400" />, name: "Slack" },
    { icon: <SiFigma className="w-7 h-7 text-zinc-400" />, name: "Figma" },
    { icon: <FaMicrosoft className="w-6 h-6 text-zinc-400" />, name: "Microsoft" },
    { icon: <SiGoogle className="w-6 h-6 text-zinc-400" />, name: "Google" },
    { icon: <SiDropbox className="w-7 h-7 text-zinc-400" />, name: "Dropbox" },
    { icon: <SiAirtable className="w-7 h-7 text-zinc-400" />, name: "Airtable" },
    { icon: <SiAsana className="w-7 h-7 text-zinc-400" />, name: "Asana" },
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
      icon: (
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl shadow-sm"
        />
      ),
      label: "WhatsApp",
      href: "https://wa.me/5551234567",
    },
    {
      icon: (
        <Image
          src="/instagram.svg"
          alt="Instagram"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl shadow-sm"
        />
      ),
      label: "Instagram",
      href: "https://www.instagram.com/yernazar.design/",
    },
    {
      icon: (
        <Image
          src="/mail.svg"
          alt="Mail"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl shadow-sm"
        />
      ),
      label: "Mail",
      href: "mailto:hello@motionsgaad.com",
    },
    {
      icon: (
        <Image
          src="/linkedin.svg"
          alt="LinkedIn"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl shadow-sm"
        />
      ),
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
  ];

  return (
    <div className="relative w-full bg-[#030303] text-white selection:bg-[#0055FF]/30 overflow-hidden font-sans pb-20">
      {/* ── Hero Avatar GIF (Layer 0 - behind background video) ── */}
      <div className="absolute top-10 sm:top-12 left-0 right-0 z-0 flex justify-center pointer-events-none">
        <div className="relative w-[300px] h-[340px] sm:w-[360px] sm:h-[400px] md:w-[500px] md:h-[560px] lg:w-[560px] lg:h-[620px]">
          <Image
            src="/hero-avatar.gif"
            alt="Hero Avatar"
            fill
            unoptimized
            priority
            className="object-contain select-none pointer-events-none mix-blend-screen brightness-125 contrast-105 opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_85%,transparent_100%)]"
          />
        </div>
      </div>

      {/* ── Main Landing Page Background Video (Layer 10 - in front of Hero Avatar) ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
        {/* <video
          ref={bgVideoRef}
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.webp"
          preload="auto"
          className="h-full w-full object-cover opacity-75 transform-gpu"
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => { });
          }}
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video> */}
        {/* Soft Vignette Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-transparent to-[#030303]/80" />
      </div>

      {/* ── Main Content (Layer 20 - in front of Background Video) ── */}
      <main className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 pt-10 sm:pt-12">

        {/* ── Hero Section (Text Overlay) ── */}
        <section className="relative z-0 flex flex-col items-center justify-center w-full text-center">
          <div className="relative z-10 w-[300px] h-[340px] sm:w-[360px] sm:h-[400px] md:w-[500px] md:h-[560px] lg:w-[560px] lg:h-[620px]">
            {/* RENCE / DIKE overlay on chest */}
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-metallic -mt-1 select-none">
                DIKE
              </h1>
            </div>
          </div>
        </section>

        {/* ── Tools Banner ── */}
        <div
          className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden z-50 -mt-6 bg-transparent flex items-center"
          style={{ height: '36px' }}
        >
          <div className="animate-marquee flex items-center whitespace-nowrap" style={{ width: 'max-content' }}>
            {[...tools, ...tools].map((tool, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-6 select-none"
              >
                {tool.icon}
              </div>
            ))}
          </div>
        </div>

        {/* ── Cinematic Widescreen Video Player ── */}
        <section className="relative mt-6 sm:mt-4 mb-8 w-full max-w-3xl mx-auto px-2 z-99">
          {/* Device frame — dark bezel surround */}
          <div
            onClick={() => setIsPlayModalOpen(true)}
            className="group cursor-pointer rounded-[10px] bg-[#080d1a] p-1.5 shadow-[0_32px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.10)]"
          >
            {/* Screen inner */}
            <div className="relative rounded-[6px] overflow-hidden border border-white/[0.10] aspect-video bg-black">

              {/* Ambient Showreel Preview */}
              <video
                src="/video.mp4"
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Glass Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative flex h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105">
                  {/* Transparent glass ring */}
                  <div className="absolute inset-0 rounded-full backdrop-blur-md bg-white/[0.08] group-hover:bg-white/[0.12] transition-all duration-300" />
                  {/* Play icon — big */}
                  <svg
                    viewBox="0 0 24 24"
                    className="relative z-10 h-9 w-9 sm:h-11 sm:w-11 fill-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ml-1"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ── Statement & Brands Panel ── */}
        <section className="relative mt-2 w-full max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight max-w-2xl mx-auto">
            Crafting incredible, impactful designs & brand experiences
          </h3>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto">
            Design is a way of telling a brand&apos;s story, communicating
            ideas, identifying real problems, and providing solutions. Crafting
            memorable designs is what I do very well.
          </p>

          {/* Brand logos */}
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-9 gap-6 items-center justify-items-center opacity-50 hover:opacity-80 transition-opacity duration-300">
            {brandLogos.map((b, i) => (
              <div
                key={i}
                className="transition-transform duration-200 hover:scale-110"
                title={b.name}
              >
                {b.icon}
              </div>
            ))}
          </div>
        </section>

        {/* ── "What I Do" Services Grid (2x2 Layout) ── */}
        <section id="what-i-do" className="relative mt-12 w-full max-w-3xl px-4 mx-auto">
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <h4 className="text-2xl font-bold text-white tracking-tight">
                what I do
              </h4>
              <div className="h-0.5 w-12 bg-gradient-to-r from-[#0055FF] to-transparent rounded-full mt-1" />
            </div>
            <span className="text-xs text-[#0055FF] font-semibold tracking-widest uppercase">
              Services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreServices.map((s, idx) => (
              <Link
                key={idx}
                href="/portfolio"
                className="group flex flex-col justify-between p-5 bg-zinc-900/40 border border-white/15 hover:border-[#0055FF]/40 rounded-2xl transition-all duration-300 backdrop-blur-lg hover:shadow-[0_12px_40px_rgba(0,85,255,0.1)] hover:-translate-y-0.5"
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
                  <span className="text-[10px] tracking-wider text-zinc-500 group-hover:text-[#0055FF] font-bold uppercase transition-colors mr-2">
                    View projects
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0055FF]/15 text-[#0055FF] group-hover:bg-[#0055FF] group-hover:text-black transition-all duration-300 text-xs font-bold shadow-sm">
                    ➔
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Contact Me ── */}
        <section className="relative mt-8 w-full text-center">
          <h4 className="text-xl font-bold text-white mb-4">Contact me</h4>

          {/* Social icons in a single row premium glass pill */}
          <div className="mx-auto w-fit rounded-full border border-white/15 bg-zinc-950/60 backdrop-blur-lg px-6 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:border-[#0055FF]/40 transition-colors duration-300">
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
            className="absolute top-4 right-6 text-white text-5xl font-light hover:text-[#0055FF] transition duration-200 z-[120] p-2"
            aria-label="Close video showreel"
          >
            &times;
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
            <video
              src="/video.mp4"
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              playsInline
            />
          </div>
        </div>
      )}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0055FF]/60 to-transparent" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0055FF]/60 to-transparent" />
    </div>
  );
}
