"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function GlobalHeader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible when near the very top of the page
      if (currentScrollY < 40) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 4) {
        // Scrolling DOWN -> immediately fade out
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 4) {
        // Scrolling UP -> immediately fade in
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full pt-3.5 sm:pt-4 pointer-events-none transition-all duration-150 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full flex items-center justify-end">
        <nav className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-black/95 px-2.5 py-1 backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => {
            const isActive =
              (item.label === "Home" && (pathname === "/" || pathname === "")) ||
              (item.label === "Projects" && (pathname === "/projects" || pathname?.startsWith("/portfolio"))) ||
              (item.label === "Services" && pathname === "/services") ||
              (item.label === "Blogs" && (pathname === "/blogs" || pathname?.startsWith("/blogs") || pathname?.startsWith("/blog")));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[14px] font-normal px-3.5 py-1.5 rounded-full transition-colors duration-200 no-underline text-[#ffffff] ${
                  isActive
                    ? "bg-white/10"
                    : "hover:bg-white/[0.08]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
