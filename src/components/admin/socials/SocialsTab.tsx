"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SocialItem } from "@/data/socials";
import SocialFormModal from "@/components/admin/socials/SocialFormModal";
import DeleteModal from "@/components/admin/DeleteModal";

interface SocialsTabProps {
  socials: SocialItem[];
  loading: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export default function SocialsTab({
  socials,
  loading,
  onDelete,
  onRefresh,
}: SocialsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<SocialItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditTarget(null);
    setShowForm(true);
  };

  const openEdit = (s: SocialItem) => {
    setEditTarget(s);
    setShowForm(true);
  };

  const toggleStatus = async (item: SocialItem) => {
    try {
      await fetch(`/api/admin/socials/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !item.enabled }),
      });
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 md:gap-0">
        <div>
          <div className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-2 leading-none">
            Presence &amp; Networking
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
            Social Media Channels
          </h2>
        </div>

        <button
          onClick={openNew}
          className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-primary-500 hover:text-white transition-all cursor-pointer w-full md:w-auto shadow-lg shadow-white/5"
        >
          <span className="text-lg leading-none">+</span>
          Add Social Link
        </button>
      </div>

      {/* Grid of Social Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {socials.map((social) => (
          <motion.div
            key={social.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
              social.enabled
                ? "bg-[#0c0c0c] border-white/[0.08] hover:border-primary-500/40"
                : "bg-white/[0.01] border-white/[0.04] opacity-50"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lg">
                    {social.platform.toLowerCase().includes("insta")
                      ? "📸"
                      : social.platform.toLowerCase().includes("tele")
                      ? "✈️"
                      : social.platform.toLowerCase().includes("whats")
                      ? "💬"
                      : social.platform.toLowerCase().includes("link")
                      ? "💼"
                      : social.platform.toLowerCase().includes("git")
                      ? "🐙"
                      : social.platform.toLowerCase().includes("mail")
                      ? "✉️"
                      : "🔗"}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-none">
                      {social.platform}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">
                      {social.username || social.platform}
                    </p>
                  </div>
                </div>

                {/* Inline Toggle */}
                <button
                  type="button"
                  onClick={() => toggleStatus(social)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${
                    social.enabled ? "bg-primary-500" : "bg-white/10"
                  }`}
                  title={social.enabled ? "Enabled" : "Disabled"}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      social.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <p className="text-white/40 text-xs truncate max-w-full font-mono bg-black/40 p-2 rounded-lg border border-white/5 mb-4">
                {social.url}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1"
              >
                Open Link
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(social)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-primary-500 hover:text-white text-white/60 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                  title="Edit Social Link"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteId(social.id)}
                  className="w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 flex items-center justify-center transition-all cursor-pointer"
                  title="Delete Social Link"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {socials.length === 0 && !loading && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/[0.05] rounded-[32px] bg-white/[0.01]">
            <p className="text-white font-bold text-lg mb-2">No social links configured</p>
            <button
              onClick={openNew}
              className="mt-4 text-primary-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
            >
              Add First Link
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <SocialFormModal
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
