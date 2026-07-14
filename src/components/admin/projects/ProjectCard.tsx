"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface GalleryImage {
  src?: string;
  alt: string;
  placeholderClassName?: string;
}

export interface ProjectDetail {
  client: string;
  year: string;
  projectType: string;
  description?: string;
  gallery: GalleryImage[];
  instagramUrl?: string;
}

export interface Project {
  id: string;
  label: string;
  kind: string;
  variant: string;
  thumbnail?: string | null;
  folderPreviews?: string[] | null;
  fallbackClassName?: string | null;
  fallbackContent?: string | null;
  detail: ProjectDetail;
  sortOrder: number;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-primary-500/50 hover:shadow-[0_20px_50px_rgba(8,134,253,0.15)] backdrop-blur-md"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-black relative overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.label}
            fill
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
            <span className="text-white/5 text-6xl font-black">MG</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-1 block">
              {project.detail.projectType || project.kind}
            </span>
            <h3 className="font-bold text-white text-lg tracking-tight mb-1 group-hover:text-primary-300 transition-colors">
              {project.label}
            </h3>
            <p className="text-white/40 text-xs font-medium">
              Client: {project.detail.client}
            </p>
          </div>

          <div className="bg-white/[0.05] border border-white/[0.1] rounded-lg px-2.5 py-1.5 flex flex-col items-center justify-center min-w-[50px]">
            <span className="text-white/20 text-[9px] font-black uppercase leading-none mb-1">
              Year
            </span>
            <span className="text-white font-bold text-sm leading-none">
              {project.detail.year}
            </span>
          </div>
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1 text-[10px] text-white/60 font-bold uppercase tracking-wider">
          {project.variant}
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/40 hover:bg-primary-400 hover:scale-110 transition-all active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            className="w-8 h-8 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
