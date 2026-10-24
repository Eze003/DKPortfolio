import { Footer } from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";

export const metadata = {
  title: "Projects | DIKE Portfolio",
  description: "Selected projects from the portfolio.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      <main className="w-full max-w-[830px] mx-auto px-6 sm:px-10 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-normal sm:font-medium tracking-tight text-white mb-8 sm:mb-10">
          Projects
        </h1>
        <ProjectsShowcase />
      </main>
      <Footer />
    </div>
  );
}
