"use client";

import { motion } from "framer-motion";
import { ExperienceItem } from "@/data/experience";

interface ExperienceCardProps {
  experience: ExperienceItem;
  onEdit: (exp: ExperienceItem) => void;
  onDelete: (id: string) => void;
}

export default function ExperienceCard({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-6 transition-all duration-300 hover:border-primary-500/40 hover:shadow-[0_20px_40px_rgba(0,85,255,0.1)] flex flex-col justify-between"
    >
      <div>
        {/* Top period & actions */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-wider">
            {experience.period}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(experience)}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-primary-500 hover:text-white text-white/50 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              title="Edit Experience"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(experience.id)}
              className="w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 flex items-center justify-center transition-all cursor-pointer"
              title="Delete Experience"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Role & Company */}
        <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-primary-300 transition-colors">
          {experience.role}
        </h3>
        <p className="text-white/60 text-sm font-medium mt-0.5 mb-3 flex items-center gap-2">
          <span>{experience.company}</span>
          {experience.location && (
            <>
              <span className="text-white/20">&bull;</span>
              <span className="text-white/40 text-xs">{experience.location}</span>
            </>
          )}
        </p>

        {/* Description */}
        {experience.description && (
          <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-4">
            {experience.description}
          </p>
        )}
      </div>

      {/* Skills tags */}
      {experience.skills && experience.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
          {experience.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium text-white/60"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
