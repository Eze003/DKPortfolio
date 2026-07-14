"use client";

import SkeletonBlock from "@/components/admin/skeletons/SkeletonBlock";

function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <SkeletonBlock className="absolute inset-0 rounded-none" />
      </div>
      <div className="p-4 space-y-2.5">
        <SkeletonBlock className="h-3.5 w-3/4" />
        <SkeletonBlock className="h-2.5 w-1/2" />
        <SkeletonBlock className="h-2 w-1/3" />
      </div>
    </div>
  );
}

export default function ProjectSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SkeletonBlock className="h-5 w-36" />
        <SkeletonBlock className="h-9 w-36 rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
