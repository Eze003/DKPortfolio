"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/components/admin/projects/ProjectCard";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import ProjectFormModal from "@/components/admin/projects/ProjectFormModal";
import ProjectSkeleton from "@/components/admin/projects/skeletons/ProjectSkeleton";
import DeleteModal from "@/components/admin/DeleteModal";

interface ProjectsTabProps {
  projects: Project[];
  loading: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export default function ProjectsTab({ projects, loading, onDelete, onRefresh }: ProjectsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditTarget(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditTarget(p);
    setShowForm(true);
  };

  if (loading && projects.length === 0) {
    return <div className="p-8"><ProjectSkeleton /></div>;
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 md:gap-0">
        <div>
          <div className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-2 leading-none">
            Studio Management
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
            Project Archive
          </h2>
        </div>

        <button
          onClick={openNew}
          className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-primary-500 hover:text-white transition-all cursor-pointer w-full md:w-auto"
        >
          <span className="text-lg leading-none">+</span>
          Create New Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onEdit={openEdit}
            onDelete={(id) => setDeleteId(id)}
          />
        ))}

        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/[0.05] rounded-[32px] bg-white/[0.01]">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 text-2xl">⚡️</div>
            <p className="text-white font-bold text-xl mb-2">No projects yet</p>
            <p className="text-white/30 text-sm max-w-xs text-center leading-relaxed">
              Start by adding your first project to showcase your best work.
            </p>
            <button
              onClick={openNew}
              className="mt-8 text-primary-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8 decoration-primary-500/40 cursor-pointer z-10"
            >
              Add First Project
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProjectFormModal
          editTarget={editTarget}
          onClose={() => setShowForm(false)}
          onSaved={onRefresh}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && onDelete(deleteId)}
        title="Delete Project"
        message="Are you sure you want to permanently remove this project?"
      />
    </div>
  );
}
