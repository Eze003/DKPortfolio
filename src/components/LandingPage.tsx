"use client";

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
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
      <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden>
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
      className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm"
      style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </div>
  );
}

function WhatsappIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] shadow-sm">
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
  );
}

function XTwitterIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-zinc-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </div>
  );
}

function PinterestIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E60023] shadow-sm">
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    </div>
  );
}

function BehanceIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#053eff] shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.39-.42 1.93-.28.55-.67 1.01-1.16 1.36-.49.36-1.06.62-1.7.78-.64.17-1.31.25-2.02.25H0V4.503h6.938zm-.54 5.88c.54 0 .98-.13 1.32-.4.34-.26.51-.67.51-1.22 0-.3-.06-.56-.16-.76-.11-.2-.26-.36-.45-.48-.19-.12-.41-.21-.65-.26-.25-.05-.51-.07-.78-.07H3.16v3.19h3.24zm.15 6.15c.29 0 .57-.03.83-.09.26-.06.49-.16.69-.3.2-.14.36-.33.48-.57.12-.24.18-.54.18-.9 0-.72-.2-1.23-.6-1.55-.4-.31-.93-.47-1.59-.47H3.16v3.88h3.39zm11.17-9.3c-1.35 0-2.47.36-3.38 1.09-.91.73-1.4 1.82-1.47 3.28h7.8c-.1-1.49-.55-2.58-1.39-3.28-.83-.69-1.82-1.09-1.56-.09zM24 13.15c0 .07-.01.17-.02.29h-7.23c.12.74.42 1.28.91 1.64.49.36 1.1.54 1.81.54.65 0 1.2-.14 1.65-.42.44-.28.71-.56.81-.84h2.79c-.38 1.15-1.02 2.03-1.93 2.66-.91.62-2 .94-3.27.94-1.77 0-3.19-.55-4.28-1.64-1.09-1.09-1.63-2.59-1.63-4.5 0-1.88.53-3.37 1.61-4.48 1.07-1.1 2.49-1.65 4.25-1.65 1.74 0 3.14.56 4.22 1.67C23.49 8.49 24 10.55 24 13.15zm-6.29-6.18h-4.84v1.46h4.84V6.97z"/>
      </svg>
    </div>
  );
}

export function LandingPage() {
  const tools = [
    {
      icon: (
        <div className="flex items-center justify-center w-9 h-9 bg-zinc-900 text-sm font-black rounded-lg border border-amber-500/30 text-amber-400 select-none shadow-sm shrink-0">
          Ai
        </div>
      ),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-9 h-9 bg-zinc-900 text-sm font-black rounded-lg border border-blue-500/30 text-blue-400 select-none shadow-sm shrink-0">
          Ps
        </div>
      ),
    },
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
          <SiAsana className="w-5 h-5 text-[#fc636b]" />
          <span className="text-sm font-semibold text-zinc-300">asana</span>
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
        <span className="text-sm font-black tracking-wider text-zinc-400 border border-zinc-700/60 rounded-lg px-2 py-1 bg-zinc-900/80 select-none shrink-0">
          AI +
        </span>
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

  const services = [
    { title: "BRAND IDENTITY & LOGO DESIGN", seed: "visamie" },
    { title: "SOCIAL MEDIA ADS/DESIGN", seed: "dodo" },
    { title: "YOUTUBE THUMBNAILS", seed: "skinclub" },
    { title: "MOVIE POSTERS/ALBUM COVERS", seed: "neonnights" },
    { title: "SPORTS DESIGN", seed: "dfc" },
    { title: "AI PROMPT FOR DESIGN AND OTHERS", seed: "luzora" },
  ];

  const socials = [
    { icon: <GmailIcon />, label: "Gmail", href: "mailto:hello@motionsgaad.com" },
    { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/yernazar.design/" },
    { icon: <WhatsappIcon />, label: "Whatsapp", href: "https://wa.me/5551234567" },
    { icon: <XTwitterIcon />, label: "X/Twitter", href: "https://x.com" },
    { icon: <PinterestIcon />, label: "Pinterest", href: "https://pinterest.com" },
    { icon: <BehanceIcon />, label: "Behance", href: "https://behance.net" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-white selection:bg-[#10b981]/30 overflow-x-hidden font-sans">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[22%] -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10b981]/8 blur-[100px] sm:h-[800px] sm:w-[800px]" />



      {/* ── Main Content ── */}
      <main className="mx-auto max-w-5xl px-4 sm:px-8 pt-28 sm:pt-32 pb-24">

        {/* ── Hero Section ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center w-full py-4">

          {/* Left: Role tag */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 self-center">
            <div className="w-12 h-[2px] bg-[#10b981] mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Graphic/Product<br />& Brand Designer
            </h2>
          </div>

          {/* Center: Avatar + Name overlay */}
          <div className="relative flex flex-col items-center justify-center order-1 md:order-2">
            <div className="relative w-[260px] h-[280px] sm:w-[300px] sm:h-[320px] md:w-[340px] md:h-[360px]">
              {/* Faint background glow plate behind avatar */}
              <div className="absolute inset-[-20px] rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18)_0%,rgba(16,185,129,0.06)_45%,transparent_70%)] blur-[30px]" />
              <div className="absolute inset-[10px] rounded-full bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,255,255,0.04)_0%,transparent_65%)]" />
              <Image
                src="/ivan_avatar.png"
                alt="Ivan Character Avatar"
                fill
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] select-none"
                priority
              />
              {/* RENCE / Ivann overlay on chest */}
              <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none">
                <span className="text-[#10b981] tracking-[0.55em] text-[9px] font-black uppercase drop-shadow">
                  R E N C E
                </span>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-metallic -mt-1 select-none">
                  Ivann
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right order-3 self-center">
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px]">
              Hi, I'm Ivan, a graphic designer, product designer, and brand
              illustrator passionate about crafting result driven designs and
              giving your products an interesting story and look
            </p>
          </div>
        </section>

        {/* ── Curved Arc Orbit ── */}
        {/* Full-width breakout: items orbit on a large circle, only top arc visible */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-10" style={{ height: '230px' }}>
          {/* Centering wrapper – center of circle sits 380px below container top */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '380px',   /* center of orbit wheel */
              transform: 'translateX(-50%)',
              width: '0px',
              height: '0px',
            }}
          >
            {/* Spinning wheel */}
            <div className="animate-orbit-spin" style={{ position: 'relative', width: '0', height: '0' }}>
              {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => {
                const total = tools.length * 4;
                const angle = (idx / total) * 360; // evenly around circle
                const radius = 440; // px – arc diameter
                return (
                  <div
                    key={`arc-${idx}`}
                    style={{
                      position: 'absolute',
                      width: '60px',
                      height: '60px',
                      top: '0px',
                      left: '0px',
                      transform: `rotate(${angle}deg) translateY(-${radius}px) translateX(-50%)`,
                    }}
                  >
                    {/* Items tilt with the arc — no counter-rotation for organic feel */}
                    <div style={{ opacity: 0.35, transform: 'scale(0.88)' }}>
                      {tool.icon}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] bg-[#10b981]/20 my-14" />

        {/* ── Statement Section ── */}
        <section className="w-full max-w-4xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
            Crafting incredible, impactful, satisfactory designs, brand
            identities and many more...
          </h3>
          <p className="mt-4 text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Design is not just about pictures, words, logo, color and
            typography, it is a way of telling a brand's story, communicating
            ideas, identifying real problems and providing solutions to those
            who needs it. Crafting and curating Memorable designs and branding
            is what I do very well....
          </p>
        </section>

        {/* ── Client Brands ── */}
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center items-center opacity-20">
          {brandLogos.map((b, i) => (
            <div key={i} className="text-zinc-400">{b.icon}</div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] bg-[#10b981]/20 my-14" />

        {/* ── What I Do ── */}
        <section id="what-i-do" className="w-full">
          <h4 className="text-2xl font-bold text-white mb-7">what I do</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, idx) => (
              <Link
                key={idx}
                href="/portfolio"
                className="group flex items-center justify-between p-2.5 bg-black border border-[#10b981]/15 hover:border-[#10b981]/50 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-[68px] h-[50px] rounded-xl overflow-hidden border border-white/10 shrink-0 bg-zinc-950">
                    <Image
                      src={`https://picsum.photos/seed/${s.seed}/136/100`}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="68px"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest text-zinc-300 group-hover:text-white uppercase leading-snug">
                    {s.title}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10b981] text-black font-bold text-sm shrink-0 ml-2 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  ➔
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Contact Me ── */}
        <section className="mt-20 w-full text-center">
          <h4 className="text-xl font-bold text-white mb-6">Contact me</h4>

          {/* Pill container — single row, no wrapping */}
          <div className="mx-auto w-fit rounded-full border border-[#10b981]/20 bg-black px-4 sm:px-6 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 sm:gap-5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 group"
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
    </div>
  );
}
