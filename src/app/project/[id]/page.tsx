"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PortfolioVideoPlayer } from "@/components/ui/PortfolioVideoPlayer";
import { IoChevronBackCircle } from "react-icons/io5";
import { projects as staticProjects } from "@/data/projects";
import { Footer } from "@/components/Footer";

// Curated showcases fallback in case DB/static list doesn't have custom media
const curatedFallbackDetails: Record<
  string,
  {
    title: string;
    category: string;
    client: string;
    year: string;
    description: string;
    gallery: { src: string; alt?: string; span?: number; type?: string }[];
  }
> = {
  brandify: {
    title: "Brandify – Agency Identity System",
    category: "Brand Identity",
    client: "Brandify Studio",
    year: "2025",
    description:
      "A complete agency identity system, dynamic motion branding, bespoke typography guidelines, and digital launch collateral.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
        alt: "Brandify Hero Showcase",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
        alt: "Visual Identity System",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
        alt: "Digital Branding Collateral",
        span: 6,
      },
    ],
  },
  visamie: {
    title: "Visamie – Digital Brand Experience",
    category: "Brand Identity",
    client: "Visamie Inc.",
    year: "2025",
    description:
      "Modern logo system, fluid digital guidelines, and interactive design language engineered for global scale.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
        alt: "Visamie Digital Experience",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
        alt: "Visamie Interface Kit",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
        alt: "Visamie Neon Loops",
        span: 6,
      },
    ],
  },
  "dodo-pizza": {
    title: "Dodo Pizza – Motion Design Toolkit",
    category: "Motion Design",
    client: "Dodo Brands",
    year: "2024",
    description:
      "High-energy TV spots, promotional social cuts, kinetic typography, and custom in-app motion toolkits.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80",
        alt: "Dodo Pizza Motion Reel",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
        alt: "Dodo Pizza Campaign Key Visual",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
        alt: "Dodo Pizza Social Stills",
        span: 6,
      },
    ],
  },
  dfc: {
    title: "DFC – Championship Arena Visuals",
    category: "Event Visuals",
    client: "DFC League",
    year: "2025",
    description:
      "Electric stadium arena screen animations, walkout visual suites, motion posters, and fighter broadcast graphics.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
        alt: "DFC Arena Visuals",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
        alt: "Arena Lighting Setup",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
        alt: "Fighter Promo Graphic",
        span: 6,
      },
    ],
  },
  "skin-club": {
    title: "Skin.Club – 3D & Product Motion",
    category: "3D & Motion",
    client: "Skin.Club",
    year: "2024",
    description:
      "Stylized 3D product renders, dynamic lootbox animations, and luminous neon-lit loops for global community events.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80",
        alt: "Skin.Club 3D Render",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
        alt: "Skin.Club Motion Frames",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        alt: "Skin.Club Cyber Visual",
        span: 6,
      },
    ],
  },
  "dala-camp": {
    title: "DALA CAMP – Summer Campaign Film",
    category: "Campaign Film",
    client: "DALA",
    year: "2025",
    description:
      "Cinematic director’s cut, vibrant festival teasers, and multi-format social campaign reels for youth summer festival.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
        alt: "DALA Camp Campaign Visual",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        alt: "Festival Action Shot",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
        alt: "Editorial Stills",
        span: 6,
      },
    ],
  },
  megacampus: {
    title: "Megacampus – Corporate Film & Opener",
    category: "Corporate Video",
    client: "Megacampus",
    year: "2024",
    description:
      "Prestigious corporate recruitment film, brand summit keynote opener, and executive motion presentation assets.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
        alt: "Megacampus Corporate Film",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
        alt: "Keynote Opener Stills",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
        alt: "Auditorium Presentation",
        span: 6,
      },
    ],
  },
  "geely-major": {
    title: "Geely x Major – Automotive Reveal",
    category: "Automotive Launch",
    client: "Geely × Major",
    year: "2025",
    description:
      "High-octane car launch reveal film, dealer showroom interactive video wall, and multi-channel launch package.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=80",
        alt: "Geely x Major Reveal",
        span: 12,
      },
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
        alt: "Vehicle Dynamics Shot",
        span: 6,
      },
      {
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
        alt: "Night Drive Sequence",
        span: 6,
      },
    ],
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const match = data.find((item: any) => item.id === id);
            if (match) {
              setProject(match);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch project from API:", err);
      }

      // Fallback 1: check static data
      const staticMatch = staticProjects.find((item) => item.id === id);
      if (staticMatch) {
        setProject(staticMatch);
        setLoading(false);
        return;
      }

      // Fallback 2: check curated fallback details
      if (curatedFallbackDetails[id]) {
        const curated = curatedFallbackDetails[id];
        setProject({
          id,
          label: curated.title,
          detail: {
            client: curated.client,
            year: curated.year,
            projectType: curated.category,
            description: curated.description,
            gallery: curated.gallery,
          },
        });
        setLoading(false);
        return;
      }

      // If really not found anywhere, redirect to /projects
      router.push("/projects");
      setLoading(false);
    }

    if (id) {
      fetchProject();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  // Resolve project metadata with graceful fallbacks
  const curated = curatedFallbackDetails[id];
  const title = project.label || project.title || curated?.title || "Project";
  const year = project.detail?.year || curated?.year || "2025";
  const projectType =
    project.detail?.projectType || project.category || curated?.category || "Motion & Design";
  const client = project.detail?.client || curated?.client || "Commissioned Work";
  const description =
    project.detail?.description ||
    curated?.description ||
    `${title} is a custom production and visual storytelling project.`;

  // Gallery resolution
  let gallery = project.detail?.gallery;
  if (!gallery || gallery.length === 0) {
    if (curated?.gallery) {
      gallery = curated.gallery;
    } else if (project.thumbnail) {
      gallery = [
        { src: project.thumbnail, alt: title, span: 12 },
        { src: project.thumbnail, alt: `${title} preview`, span: 6 },
        { src: project.thumbnail, alt: `${title} detail`, span: 6 },
      ];
    } else {
      gallery = [];
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-24  overflow-x-hidden relative text-white">
      {/* ── Main Background Ambient Video ── */}
      {/* <div className="pointer-events-none fixed inset-0 overflow-hidden z-0"> */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.webp"
        preload="auto"
        className="h-full w-full object-cover opacity-75 transform-gpu"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video> */}
      {/* Soft Vignette Overlay for Text Readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/40 to-[#030303]" /> */}
      {/* </div> */}

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Back button */}
          <div className="mb-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              <IoChevronBackCircle className="h-5 w-5 text-primary-500" />
              <span>Back to projects</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10 md:gap-8">
            {/* Left Section */}
            <div className="flex flex-col md:w-[60%] relative group">
              <div className="inline-flex items-center gap-3 px-1 py-1 rounded-full bg-[#111] border border-white/5 w-fit mb-6 relative overflow-hidden shadow-[0_0_30px_-10px_rgba(0,85,255,0.3)]">
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(0, 85, 255, 0.2) 171.892deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)",
                  }}
                />

                <span className="relative z-10 px-3 py-1 rounded-full bg-gradient-to-b from-primary-500 to-primary-700 text-[10px] font-bold text-white uppercase tracking-wider shadow-[inset_0_1px_rgba(255,255,255,0.2)]">
                  YEAR
                </span>
                <span className="relative z-10 text-sm font-medium text-white/80 pr-4">
                  {year}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-medium mb-6 leading-[1.08] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                {title}
              </h1>

              <p className="text-white/60 text-base md:text-[17px] max-w-xl leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {projectType && (
                  <div className="relative px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[15px] text-white/80 overflow-hidden hover:bg-white/10 transition-colors backdrop-blur-sm shadow-[0_0_25px_-10px_rgba(0,85,255,0.2)]">
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background:
                          "conic-gradient(rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(0, 85, 255, 0.2) 171.892deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)",
                      }}
                    />
                    {projectType}
                  </div>
                )}
                {client && (
                  <div className="relative px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[15px] text-white/80 overflow-hidden hover:bg-white/10 transition-colors backdrop-blur-sm shadow-[0_0_25px_-10px_rgba(0,85,255,0.2)]">
                    Client: {client}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Collage / Media Reel */}
        {gallery.length > 0 && (
          <div className="w-full relative mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 w-full">
              {gallery.map((media: any, i: number) => {
                const span = media.span || 12;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05 }}
                    className="group relative"
                    style={{
                      gridColumn: `span ${span}`,
                    }}
                  >
                    {/* Backlight Glow */}
                    <div className="absolute -inset-4 bg-primary-500/15 blur-[40px] rounded-xl opacity-100" />

                    <div
                      className={`relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-[0_0_40px_-12px_rgba(0,85,255,0.2)] ${span === 12
                        ? "aspect-video"
                        : span >= 6
                          ? "aspect-[4/3]"
                          : "aspect-square"
                        }`}
                    >
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none z-10"
                        style={{
                          background:
                            "conic-gradient(rgba(255, 255, 255, 0.1) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(0, 85, 255, 0.1) 171.892deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)",
                        }}
                      />

                      {media.type === "video" ||
                        (media.src &&
                          (/\.(mp4|mov|webm|ogg|avi)$/i.test(media.src) ||
                            media.src.includes("/video/"))) ? (
                        <PortfolioVideoPlayer
                          src={media.src}
                          className="w-full h-full"
                        />
                      ) : (
                        <Image
                          src={media.src}
                          alt={media.alt || `${title} Media ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes={
                            span === 12
                              ? "1200px"
                              : span === 6
                                ? "800px"
                                : "400px"
                          }
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
