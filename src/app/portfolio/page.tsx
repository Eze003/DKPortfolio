import PortfolioGridSection from "@/components/portfolio/PortfolioGridSection";
import PortfolioHeroSection from "@/components/portfolio/PortfolioHeroSection";

export const metadata = {
  title: "Portfolio",
  description: "Selected work and creative direction",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <PortfolioHeroSection />
      <PortfolioGridSection />
    </main>
  );
}
