"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceItem } from "@/data/experience";

interface ExperienceFormModalProps {
  editTarget: ExperienceItem | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ExperienceFormModal({
  editTarget,
  onClose,
  onSaved,
}: ExperienceFormModalProps) {
  const isEdit = Boolean(editTarget);

  const [role, setRole] = useState(editTarget?.role || "");
  const [company, setCompany] = useState(editTarget?.company || "");
  const [location, setLocation] = useState(editTarget?.location || "");
  const [period, setPeriod] = useState(editTarget?.period || "");
  const [description, setDescription] = useState(editTarget?.description || "");
  const [skillsText, setSkillsText] = useState(
    editTarget?.skills?.join(", ") || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) {
      setError("Role and company are required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const skills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      role,
      company,
      location,
      period: period || "Present",
      description,
      skills,
    };

    try {
      const url = isEdit
        ? `/api/admin/experience/${editTarget!.id}`
        : "/api/admin/experience";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save experience");
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
          className="relative w-full max-w-xl bg-[#0d0d0f] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] block mb-1">
                {isEdit ? "Update Career Milestone" : "Add Experience"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {isEdit ? "Edit Experience Entry" : "New Career Experience"}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Job Title / Role *
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Senior Motion Designer"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Agency Studio / Freelance"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Location & Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="London, UK / Remote"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                  Period / Timeline
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="2023 — Present"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Responsibilities &amp; Achievements
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key contributions, design initiatives, notable client campaigns, tools used..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors leading-relaxed"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Tools &amp; Skills (comma separated)
              </label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="After Effects, Cinema 4D, Figma, Creative Direction"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
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
                  : "Add Experience"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
