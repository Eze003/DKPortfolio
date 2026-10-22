"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/data/blogs";
import MediaUpload from "@/components/MediaUpload";

interface BlogFormModalProps {
  editTarget: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function BlogFormModal({
  editTarget,
  onClose,
  onSaved,
}: BlogFormModalProps) {
  const isEdit = Boolean(editTarget);

  const [title, setTitle] = useState(editTarget?.title || "");
  const [slug, setSlug] = useState(editTarget?.slug || "");
  const [tag, setTag] = useState(editTarget?.tag || "PROCESS");
  const [date, setDate] = useState(
    editTarget?.date ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
  );
  const [image, setImage] = useState(editTarget?.image || "");
  const [subtitle, setSubtitle] = useState(editTarget?.subtitle || "");
  const [paragraphsText, setParagraphsText] = useState(
    editTarget?.paragraphs?.join("\n\n") || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit && title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  }, [title, isEdit, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Blog title is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const paragraphs = paragraphsText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tag,
      date,
      image: image || "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&auto=format&fit=crop&q=80",
      subtitle,
      paragraphs,
    };

    try {
      const url = isEdit
        ? `/api/admin/blogs/${editTarget!.id || editTarget!.slug}`
        : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save blog post");
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0d0d0f] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] block mb-1">
                {isEdit ? "Update Article" : "New Publication"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {isEdit ? "Edit Blog Post" : "Write Blog Post"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              &times;
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Post Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Future of Kinetic Design Systems"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Slug & Tag row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="future-kinetic-design"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value.toUpperCase())}
                  placeholder="PROCESS, TYPOGRAPHY, MOTION..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Date & Image Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Publication Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="May 12, 2026"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <div className="shrink-0">
                    <MediaUpload
                      label="Upload"
                      type="image"
                      onUpload={(url) => setImage(url)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle / Excerpt */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Subtitle / Summary Excerpt
              </label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="A compelling one or two sentence overview of this article..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Paragraphs */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Article Content (Separate paragraphs with double Enter)
              </label>
              <textarea
                rows={8}
                value={paragraphsText}
                onChange={(e) => setParagraphsText(e.target.value)}
                placeholder="Write your article paragraphs here. Separate each paragraph with an empty line (double enter)..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-white text-sm font-bold shadow-lg shadow-primary-500/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEdit
                  ? "Save Changes"
                  : "Publish Blog"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
