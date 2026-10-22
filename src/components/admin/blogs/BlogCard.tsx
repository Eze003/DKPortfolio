"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  blog: BlogPost;
  onEdit: (b: BlogPost) => void;
  onDelete: (id: string) => void;
}

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#0c0c0c] overflow-hidden transition-all duration-500 hover:border-primary-500/50 hover:shadow-[0_20px_50px_rgba(0,85,255,0.15)] flex flex-col justify-between"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
            <span className="text-white/20 text-4xl font-black">BLOG</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Tag badge top left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-primary-400 uppercase tracking-widest shadow-lg">
            {blog.tag || "ARTICLE"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-white/40 text-xs font-medium block mb-1.5">
            {blog.date}
          </span>
          <h3 className="font-bold text-white text-base leading-snug tracking-tight mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          {blog.subtitle && (
            <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">
              {blog.subtitle}
            </p>
          )}
        </div>

        {/* Action buttons footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <a
            href={`/blogs/${blog.slug || blog.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1"
          >
            Preview Post
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(blog)}
              className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
              title="Edit Post"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            <button
              onClick={() => onDelete(blog.id || blog.slug)}
              className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              title="Delete Post"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
