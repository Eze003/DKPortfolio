import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getDb } from "@/lib/db";
import { BlogEntity } from "@/lib/entities/Blog";
import { initialBlogs, BlogPost } from "@/data/blogs";

export const metadata = {
  title: "Blogs | DIKE Portfolio",
  description: "Insights, design processes, typography, color systems, and UX research.",
};

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const db = await getDb();
    const blogs = await db
      .getRepository(BlogEntity)
      .find({ order: { sortOrder: "ASC" } });
    if (blogs && blogs.length > 0) {
      return blogs.map((b) => ({
        id: b.id,
        slug: b.slug,
        tag: b.tag,
        title: b.title,
        subtitle: b.subtitle || "",
        date: b.date,
        image: b.image,
        paragraphs: b.paragraphs,
      }));
    }
  } catch (err) {
    console.error("[BlogsPage] DB error:", err);
  }
  return initialBlogs;
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      {/* ── Main Content Container ── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-normal sm:font-medium tracking-tight text-white mb-8 sm:mb-10">
          Blogs
        </h1>

        {/* 2-Column Blog Grid matching reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2 lg:gap-2">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug || blog.id}`}
              className="group relative flex flex-col rounded-[22px] sm:rounded-[26px] border border-white/[0.08] bg-[#0c0c0c] p-2.5 sm:p-3 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f] no-underline"
            >
              {/* Outer border & image wrapper */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[275px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#161616]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Floating Tag Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/[0.12] text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase">
                    {blog.tag}
                  </span>
                </div>
              </div>

              {/* Text metadata block */}
              <div className="px-1 pt-3.5 pb-2 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mb-1.5">
                    {blog.date}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-[22px] font-medium text-white tracking-tight leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-white">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
