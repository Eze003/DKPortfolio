"use client";

import { useState } from "react";
import { BlogPost } from "@/data/blogs";
import BlogCard from "@/components/admin/blogs/BlogCard";
import BlogFormModal from "@/components/admin/blogs/BlogFormModal";
import DeleteModal from "@/components/admin/DeleteModal";

interface BlogsTabProps {
  blogs: BlogPost[];
  loading: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export default function BlogsTab({
  blogs,
  loading,
  onDelete,
  onRefresh,
}: BlogsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditTarget(null);
    setShowForm(true);
  };

  const openEdit = (b: BlogPost) => {
    setEditTarget(b);
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 md:gap-0">
        <div>
          <div className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-2 leading-none">
            Content &amp; Insights
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
            Blog Publications
          </h2>
        </div>

        <button
          onClick={openNew}
          className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-primary-500 hover:text-white transition-all cursor-pointer w-full md:w-auto shadow-lg shadow-white/5"
        >
          <span className="text-lg leading-none">+</span>
          Write New Blog
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id || blog.slug}
            blog={blog}
            onEdit={openEdit}
            onDelete={(id) => setDeleteId(id)}
          />
        ))}

        {blogs.length === 0 && !loading && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/[0.05] rounded-[32px] bg-white/[0.01]">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 text-2xl">
              ✍️
            </div>
            <p className="text-white font-bold text-xl mb-2">No blogs published yet</p>
            <p className="text-white/30 text-sm max-w-xs text-center leading-relaxed">
              Publish insights, case studies, and creative processes to engage your audience.
            </p>
            <button
              onClick={openNew}
              className="mt-8 text-primary-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8 decoration-primary-500/40 cursor-pointer"
            >
              Write First Blog
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <BlogFormModal
          editTarget={editTarget}
          onClose={() => setShowForm(false)}
          onSaved={onRefresh}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
