"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check for login page itself
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const authed = localStorage.getItem("admin_authed");
    if (!authed) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
