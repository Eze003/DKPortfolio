"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialItem } from "@/data/socials";

interface SocialFormModalProps {
  editTarget: SocialItem | null;
  onClose: () => void;
  onSaved: () => void;
}

const PRESET_PLATFORMS = [
  "Instagram",
  "Telegram",
  "WhatsApp",
  "LinkedIn",
  "Twitter / X",
  "GitHub",
  "YouTube",
  "Behance",
  "Dribbble",
  "Discord",
  "Email",
  "Custom",
];

export default function SocialFormModal({
  editTarget,
  onClose,
  onSaved,
}: SocialFormModalProps) {
  const isEdit = Boolean(editTarget);

  const [platform, setPlatform] = useState(editTarget?.platform || "Instagram");
  const [url, setUrl] = useState(editTarget?.url || "");
  const [username, setUsername] = useState(editTarget?.username || "");
  const [enabled, setEnabled] = useState(
    editTarget?.enabled !== undefined ? editTarget.enabled : true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform.trim() || !url.trim()) {
      setError("Platform and URL are required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      platform,
      url,
      username,
      icon: platform.toLowerCase().replace(/[^a-z0-9]/g, ""),
      enabled,
    };

    try {
      const targetUrl = isEdit
        ? `/api/admin/socials/${editTarget!.id}`
        : "/api/admin/socials";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(targetUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save social link");
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
          className="relative w-full max-w-lg bg-[#0d0d0f] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] block mb-1">
                {isEdit ? "Update Channel" : "New Social Link"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {isEdit ? "Edit Social Channel" : "Connect Social Platform"}
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
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Platform *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_PLATFORMS.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      platform === p
                        ? "bg-primary-500 text-white border border-primary-400 shadow-md shadow-primary-500/20"
                        : "bg-white/[0.03] text-white/60 border border-white/10 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <input
                type="text"
                required
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="Platform name"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Destination URL *
              </label>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://instagram.com/yourhandle or mailto:you@domain.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Username / Handle */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Display Username / Handle
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username or +44..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">Active Channel</p>
                <p className="text-xs text-white/40">Visible across footer, dock, and contact points</p>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  enabled ? "bg-primary-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
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
                {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Add Link"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
