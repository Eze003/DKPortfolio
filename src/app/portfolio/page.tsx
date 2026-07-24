"use client";

import { useEffect, useRef } from "react";
import PortfolioGridSection from "@/components/portfolio/PortfolioGridSection";
import PortfolioHeroSection from "@/components/portfolio/PortfolioHeroSection";

export default function PortfolioPage() {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = true;
      bgVideoRef.current.loop = true;
      bgVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
      {/* ── Main Portfolio Page Background Video ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <video
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
            e.currentTarget.play().catch(() => {});
          }}
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft Vignette Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-transparent to-[#030303]/80" />
      </div>

      <div className="relative z-10">
        <PortfolioHeroSection />
        <PortfolioGridSection />
      </div>
    </main>
  );
}
