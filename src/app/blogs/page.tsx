import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Blogs | DIKE Portfolio",
  description: "Insights, design processes, typography, color systems, and UX research.",
};

const blogsList = [
  {
    id: "design-process",
    tag: "PROCESS",
    title: "The Design Process That Actually Works: A Behind-the-Scenes Look",
    date: "May 12, 2026",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&auto=format&fit=crop&q=80",
    href: "/blogs/design-process",
  },
  {
    id: "typography-arsenal",
    tag: "TYPOGRAPHY",
    title: "Why Typography Is the Most Underestimated Tool in a Designer's Arsenal",
    date: "Apr 3, 2026",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80",
    href: "/blogs/typography-arsenal",
  },
  {
    id: "color-systems",
    tag: "COLOR & SYSTEMS",
    title: "Color Theory Is Not Enough: How We Actually Build Color Systems",
    date: "Mar 18, 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    href: "/blogs/color-systems",
  },
  {
    id: "user-research",
    tag: "UX RESEARCH",
    title: "What User Research Actually Looks Like When You Do It Right",
    date: "Feb 7, 2026",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
    href: "/blogs/user-research",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      {/* ── Main Content Container (substantially increased px) ── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-normal sm:font-medium tracking-tight text-white mb-8 sm:mb-10">
          Blogs
        </h1>

        {/* 2-Column Blog Grid matching reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2 lg:gap-2">
          {blogsList.map((blog) => (
            <Link
              key={blog.id}
              href={blog.href}
              className="group relative flex flex-col justify-between rounded-[26px] sm:rounded-[30px] border border-white/[0.08] bg-[#0c0c0c] p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f] no-underline cursor-pointer"
            >
              {/* Top: Thumbnail Image (increased height) */}
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#161616]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Bottom: Info Column */}
              <div className="flex flex-col flex-1 justify-between pt-4 sm:pt-5">
                <div>
                  {/* Category / Tag Pill */}
                  <div className="inline-block rounded-full border border-white/[0.1] bg-[#141414] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium tracking-wider text-zinc-400 uppercase w-fit mb-3">
                    {blog.tag}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl md:text-[23px] font-medium tracking-tight text-[#fffc] leading-snug group-hover:text-white transition-colors duration-200">
                    {blog.title}
                  </h3>
                </div>

                {/* Published Date */}
                <p className="text-xs sm:text-[13px] text-zinc-500 font-normal m-0 pt-4 sm:pt-6">
                  {blog.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer at the end of the page */}
      <Footer />
    </div>
  );
}
