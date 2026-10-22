import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

// Curated list of showcase projects starting with Brandify to match reference exactly
const projectsList = [
  {
    id: "brandify",
    title: "Brandify – Agency Identity System",
    category: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    href: "/project/brandify",
  },
  {
    id: "visamie",
    title: "Visamie – Digital Brand Experience",
    category: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
    href: "/project/visamie",
  },
  {
    id: "dodo-pizza",
    title: "Dodo Pizza – Motion Design Toolkit",
    category: "Motion Design",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80",
    href: "/project/dodo-pizza",
  },
  {
    id: "dfc",
    title: "DFC – Championship Arena Visuals",
    category: "Event Visuals",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    href: "/project/dfc",
  },
  {
    id: "skin-club",
    title: "Skin.Club – 3D & Product Motion",
    category: "3D & Motion",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80",
    href: "/project/skin-club",
  },
  {
    id: "dala-camp",
    title: "DALA CAMP – Summer Campaign Film",
    category: "Campaign Film",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    href: "/project/dala-camp",
  },
  {
    id: "megacampus",
    title: "Megacampus – Corporate Film & Opener",
    category: "Corporate Video",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
    href: "/project/megacampus",
  },
  {
    id: "geely-major",
    title: "Geely x Major – Automotive Reveal",
    category: "Automotive Launch",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=80",
    href: "/project/geely-major",
  },
];

export const metadata = {
  title: "Projects | DIKE Portfolio",
  description: "Featured client works, motion design, and brand identity projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      {/* ── Main Content Container ── */}
      <main className="w-full max-w-[830px] mx-auto px-6 sm:px-10 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-normal sm:font-medium tracking-tight text-white mb-8 sm:mb-10">
          Projects
        </h1>

        {/* 1-Column Project Showcase Cards matching Framer template */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          {projectsList.map((project) => (
            <Link
              key={project.id}
              href={project.href || `/project/${project.id}`}
              className="group relative flex flex-col rounded-[30px] sm:rounded-[34px] border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-6.5 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f] no-underline"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[285px] sm:min-h-[330px] md:min-h-[400px] overflow-hidden rounded-[22px] sm:rounded-[26px] bg-[#161616]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={project.id === "brandify"}
                  sizes="(max-width: 870px) 100vw, 870px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Bottom Info Bar: Title & Category (Left) and View Project Button (Right) */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug mb-1 transition-colors duration-200 group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 font-normal m-0">
                    {project.category}
                  </p>
                </div>

                {/* View Project Pill Button */}
                <div className="flex justify-end shrink-0 sm:self-end">
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#181818] border border-white/[0.08] pl-5 sm:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white/95 shrink-0 transition-colors duration-200 group-hover:bg-[#222222] group-hover:border-white/15">
                    <span>View Project</span>
                    <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-black shrink-0 overflow-hidden">
                      {/* Straight right arrow (rotates CLOCKWISE +45° and fades out) */}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute transition-all duration-300 ease-out opacity-100 rotate-0 scale-100 group-hover:opacity-0 group-hover:rotate-45 group-hover:scale-50"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {/* Right diagonal arrow (starts at -45° and rotates CLOCKWISE to 0°) */}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute transition-all duration-300 ease-out opacity-0 -rotate-45 scale-50 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer Component at the end of the page */}
      <Footer />
    </div>
  );
}
