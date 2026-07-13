"use client";

import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import { BookServiceButton } from "@/components/BookServiceButton";
import { IoIosArrowDroprightCircle } from "react-icons/io";

export function GlobalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-10 md:px-16 pt-4 pb-3 w-full pointer-events-none">
      {/* Each pill has pointer-events re-enabled */}

      {/* See my work — Left */}
      <Link
        href="/portfolio"
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#10b981]/25 bg-[#041a0f]/70 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold text-zinc-200 backdrop-blur-lg transition hover:border-[#10b981]/60 hover:bg-[#062c19] hover:text-white whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
      >
        <IoIosArrowDroprightCircle className="text-[#10b981] text-lg" />
        <span className="hidden min-[380px]:inline">See my work</span>
        <span className="min-[380px]:hidden">Work</span>
      </Link>

      {/* My catalog — Center */}
      <Link
        href="/my-catalog"
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#10b981]/25 bg-[#041a0f]/70 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold text-zinc-200 backdrop-blur-lg transition hover:border-[#10b981]/60 hover:bg-[#062c19] hover:text-white whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
      >
        <FaBasketShopping className="text-[#10b981] text-[16px]" />
        <span>My catalog</span>
      </Link>

      {/* Book a service — Right */}
      <BookServiceButton
        label="Book a service"
        variant="green-pill"
        className="pointer-events-auto text-[11px] sm:text-xs px-3 sm:px-4 py-2 whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
      />
    </header>
  );
}
