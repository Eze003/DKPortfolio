"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";
import { DockNotesIcon } from "@/components/dock/DockNotesIcon";
import { dockItems, type DockItem } from "@/data/projects";

const BASE_SIZE = 60;
const MAX_SCALE = 1.45;

function DockYandexIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#fc3f1d] font-bold leading-none text-black"
      aria-hidden
    >
      Y
    </span>
  );
}

function DockInstagramIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-sm"
      aria-hidden
    >
      <SiInstagram
        style={{ width: size * 0.62, height: size * 0.62 }}
        className="text-white"
      />
    </span>
  );
}

function DockTelegramIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#26A5E4] shadow-sm"
      aria-hidden
    >
      <SiTelegram
        style={{ width: size * 0.58, height: size * 0.58 }}
        className="text-white"
      />
    </span>
  );
}

function DockWhatsappIcon({ size }: { size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#25D366] shadow-sm"
      aria-hidden
    >
      <SiWhatsapp
        style={{ width: size * 0.58, height: size * 0.58 }}
        className="text-white"
      />
    </span>
  );
}

function DockIcon({ item, size }: { item: DockItem; size: number }) {
  switch (item.icon) {
    case "yandex":
      return <DockYandexIcon size={size} />;
    case "notes":
      return <DockNotesIcon size={size} />;
    case "instagram":
      return <DockInstagramIcon size={size} />;
    case "telegram":
      return <DockTelegramIcon size={size} />;
    case "whatsapp":
      return <DockWhatsappIcon size={size} />;
  }
}

export function Dock() {
  const dockRef = useRef<HTMLUListElement>(null);
  const [scales, setScales] = useState<number[]>(() =>
    dockItems.map(() => 1),
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const updateScales = useCallback((clientX: number | null) => {
    const dock = dockRef.current;
    if (!dock || clientX === null) {
      setScales(dockItems.map(() => 1));
      return;
    }

    const items = dock.querySelectorAll<HTMLElement>("[data-dock-item]");
    const next = Array.from(items).map((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - center);
      const influence = 120;
      if (distance > influence) return 1;
      const t = 1 - distance / influence;
      return 1 + (MAX_SCALE - 1) * t * t;
    });
    setScales(next);
  }, []);

  return (
    <nav
      className="fixed bottom-8 left-1/2 z-30 -translate-x-1/2 sm:bottom-11"
      aria-label="Social links"
      onMouseLeave={() => {
        setHoveredId(null);
        updateScales(null);
      }}
    >
      <ul
        ref={dockRef}
        className="glass-dock flex items-end gap-2.5 rounded-[20px] px-4 py-1.5 sm:gap-3.5 sm:rounded-[24px] sm:px-5 sm:py-2"
        onMouseMove={(e) => updateScales(e.clientX)}
      >
        {dockItems.map((item, index) => (
          <li key={item.id} className="relative flex flex-col items-center">
            {hoveredId === item.id && (
              <>
                <span
                  className="glass-dock-glow pointer-events-none absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-2xl"
                  aria-hidden
                />
                <span className="glass-tooltip pointer-events-none absolute -top-8 whitespace-nowrap rounded-lg px-2.5 py-1 text-[10px] font-medium text-black">
                  {item.label}
                </span>
              </>
            )}
            <Link
              href={item.href}
              data-dock-item
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              onMouseEnter={() => setHoveredId(item.id)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              className="flex items-end rounded-xl p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 transition-transform duration-100 ease-out"
              style={{
                transform: `translateY(${((scales[index] ?? 1) - 1) * -24}px) scale(${scales[index] ?? 1})`,
                transformOrigin: "bottom center",
              }}
              aria-label={item.label}
            >
              <DockIcon item={item} size={BASE_SIZE} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
