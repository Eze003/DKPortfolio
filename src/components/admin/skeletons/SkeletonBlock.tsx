"use client";

import { HTMLAttributes } from "react";

interface SkeletonBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function SkeletonBlock({ className = "", ...props }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.04] border border-white/[0.05] backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}
