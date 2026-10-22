"use client";

import CvTab from "@/components/admin/cv/CvTab";

export default function AdminCvPage() {
  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <CvTab />
        </div>
      </main>
    </div>
  );
}
