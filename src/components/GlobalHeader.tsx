"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookServiceButton } from "@/components/BookServiceButton";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { usePathname } from "next/navigation";

export function GlobalHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide the global header on admin studio pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full pointer-events-none transition-all duration-500 border-b ${scrolled
          ? "pt-2 pb-2 bg-black/80 backdrop-blur-xl border-zinc-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "pt-4 pb-3 bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between">
        <Link
          href="/portfolio"
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#0055FF]/25 bg-[#071221]/80 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold text-zinc-200 backdrop-blur-lg transition hover:border-[#0055FF]/60 hover:bg-[#0a1c39] hover:text-white whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          <IoIosArrowDroprightCircle className="text-[#0055FF] text-lg" />
          <span>my works</span>
        </Link>

        <BookServiceButton
          label="Book a service"
          variant="green-pill"
          className="pointer-events-auto text-[11px] sm:text-xs px-3 sm:px-4 py-2 whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        />
      </div>
    </header>
  );
}
