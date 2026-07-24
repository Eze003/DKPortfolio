"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  {
    path: "/admin/projects",
    label: "Projects",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

export default function AdminSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("admin_authed");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 w-64 bg-[#030303] border-r border-white/[0.06] z-[70] transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0 md:flex-shrink-0 md:h-screen md:sticky md:top-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo & Close Button */}
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_16px_rgba(0,85,255,0.5)]">
              M
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">
                MotionsGaad
              </p>
              <p className="text-white/30 text-xs mt-0.5">Admin Studio</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-white/30 hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4 px-2">
            Management
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-300 group ${
                  isActive
                    ? "bg-primary-600/15 text-primary-300 border border-primary-500/30"
                    : "text-white/40 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <span
                  className={
                    isActive
                      ? "text-primary-400"
                      : "text-white/30 group-hover:text-white/60 transition-colors"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-white/[0.06]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-500/[0.06] border border-transparent hover:border-red-500/20 transition-all duration-300 font-bold"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
