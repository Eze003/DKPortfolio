"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (isLoginPage) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-black text-white flex overflow-hidden relative">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-white/[0.06] bg-[#030303] sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="text-white font-semibold text-sm">MotionsGaad Admin</span>
            </div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
