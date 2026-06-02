import { Suspense } from "react";
import { PortfolioShell } from "@/components/PortfolioShell";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-black" />}>
      <PortfolioShell />
    </Suspense>
  );
}
