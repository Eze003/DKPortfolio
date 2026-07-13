"use client";

import PortfolioHeroSection from "@/components/portfolio/PortfolioHeroSection";
import PortfolioGridSection from "@/components/portfolio/PortfolioGridSection";
import PortfolioFaqSection from "@/components/portfolio/PortfolioFaqSection";
import PortfolioCtaSection from "@/components/portfolio/PortfolioCtaSection";

export function ProjectCardsGrid() {
  return (
    <div className="w-full">
      <PortfolioHeroSection />
      <PortfolioGridSection />
      <PortfolioFaqSection />
      <PortfolioCtaSection />
    </div>
  );
}
