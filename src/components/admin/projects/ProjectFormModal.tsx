"use client";

import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Project } from "@/components/admin/projects/ProjectCard";
import MediaUpload from "@/components/MediaUpload";
import Image from "next/image";

const PROJECT_TYPES = [
  "Motion graphics",
  "Video editing",
  "Social media content",
  "3D AI video",
  "Brand identity",
  "Logo design",
  "Event visuals",
  "3D & motion",
  "Other",
];

const INPUT =
  "w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-sm focus:outline-none focus:border-primary-500/50 transition-all font-medium";

const LABEL = "block text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5 pl-1";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  type: "image" | "video";
  span?: number;
}

interface ProjectFormModalProps {
  editTarget: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProjectFormModal({ editTarget, onClose, onSaved }: ProjectFormModalProps) {
  const isEdit = Boolean(editTarget?.id);

  const [form, setForm] = useState({
    id: editTarget?.id ?? "",
    label: editTarget?.label ?? "",
    kind: editTarget?.kind ?? "app",
    variant: editTarget?.variant ?? "square",
    thumbnail: editTarget?.thumbnail ?? "",
    fallbackClassName: editTarget?.fallbackClassName ?? "",
    fallbackContent: editTarget?.fallbackContent ?? "",
    detail: {
      client: editTarget?.detail?.client ?? "",
      year: editTarget?.detail?.year ?? new Date().getFullYear().toString(),
      projectType: editTarget?.detail?.projectType ?? "",
      description: editTarget?.detail?.description ?? "",
      instagramUrl: editTarget?.detail?.instagramUrl ?? "",
    },
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(
    editTarget?.detail?.gallery?.map((g: any, idx) => ({
      id: Math.random().toString(36).substring(7) + idx,
      src: g.src ?? "",
      alt: g.alt ?? "",
      type: g.type ?? (isVideoUrl(g.src ?? "") ? "video" : "image"),
      span: g.span ?? 12,
    })) ?? []
  );

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function isVideoUrl(url: string) {
    return /\.(mp4|mov|webm|ogg|avi)$/i.test(url) || url.includes("/video/");
  }

  function setField<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function setDetail<K extends keyof typeof form.detail>(k: K, v: string) {
    setForm((prev) => ({ ...prev, detail: { ...prev.detail, [k]: v } }));
  }

  function addGalleryItem() {
    setGallery((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        src: "",
        alt: "",
        type: "image",
        span: 12,
      },
    ]);
  }

  function updateGalleryItem(index: number, updates: Partial<GalleryItem>) {
    setGallery((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updates } : item))
    );
  }

  function removeGalleryItem(index: number) {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus("idle");
    setErrorMsg("");

    try {
      const payload = {
        ...form,
        detail: {
          ...form.detail,
          gallery: gallery
            .filter((g) => g.src.trim() !== "")
            .map(({ id, ...rest }) => rest),
        },
      };

      const url = isEdit ? `/api/admin/projects/${editTarget!.id}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Save failed");
      }

      setSaveStatus("success");
      onSaved();
      setTimeout(() => onClose(), 900);
    } catch (err) {
      setSaveStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex items-start justify-center overflow-y-auto py-10 px-4"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl rounded-[28px] p-2 border border-[#222] bg-black"
      >
        <div className="rounded-2xl border border-primary-500/30 bg-[#050505] p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Form */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {isEdit ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={onClose}
                  type="button"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white text-lg transition-all border border-white/10 hover:border-white/20"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: ID + Label */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>ID (slug) *</label>
                    <input
                      required
                      disabled={isEdit}
                      value={form.id}
                      onChange={(e) => setField("id", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                      placeholder="e.g. my-project"
                      className={`${INPUT} disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Label *</label>
                    <input
                      required
                      value={form.label}
                      onChange={(e) => setField("label", e.target.value)}
                      placeholder="Display name"
                      className={INPUT}
                    />
                  </div>
                </div>

                {/* Row 2: Kind + Variant */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Kind *</label>
                    <select
                      value={form.kind}
                      onChange={(e) => setField("kind", e.target.value)}
                      className={`${INPUT} cursor-pointer`}
                    >
                      <option value="app">App</option>
                      <option value="file">File</option>
                      <option value="folder">Folder</option>
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Variant *</label>
                    <select
                      value={form.variant}
                      onChange={(e) => setField("variant", e.target.value)}
                      className={`${INPUT} cursor-pointer`}
                    >
                      <option value="square">Square</option>
                      <option value="wide">Wide</option>
                      <option value="tall">Tall</option>
                    </select>
                  </div>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className={LABEL}>Thumbnail</label>
                  {form.thumbnail ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 border border-white/10 group">
                      <Image
                        src={form.thumbnail}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                        sizes="600px"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setField("thumbnail", "")}
                          className="px-4 py-2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <MediaUpload
                      label="Upload Thumbnail"
                      accept="image/*"
                      type="image"
                      onUpload={(url) => setField("thumbnail", url)}
                    />
                  )}
                </div>

                {/* Fallback (app only) */}
                {form.kind === "app" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Fallback BG class</label>
                      <input
                        value={form.fallbackClassName ?? ""}
                        onChange={(e) => setField("fallbackClassName", e.target.value)}
                        placeholder="bg-[#e53935]"
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Fallback letter (max 3)</label>
                      <input
                        value={form.fallbackContent ?? ""}
                        onChange={(e) => setField("fallbackContent", e.target.value)}
                        placeholder="V"
                        maxLength={3}
                        className={INPUT}
                      />
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-4">
                    Project Details
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Client *</label>
                      <input
                        required
                        value={form.detail.client}
                        onChange={(e) => setDetail("client", e.target.value)}
                        placeholder="Client name"
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Year *</label>
                      <input
                        required
                        value={form.detail.year}
                        onChange={(e) => setDetail("year", e.target.value)}
                        placeholder="2025"
                        className={INPUT}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={LABEL}>Project Type *</label>
                    <select
                      required
                      value={form.detail.projectType}
                      onChange={(e) => setDetail("projectType", e.target.value)}
                      className={`${INPUT} cursor-pointer`}
                    >
                      <option value="">Select type...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className={LABEL}>Description</label>
                    <textarea
                      rows={3}
                      value={form.detail.description ?? ""}
                      onChange={(e) => setDetail("description", e.target.value)}
                      placeholder="Project description..."
                      className={`${INPUT} resize-none`}
                    />
                  </div>

                  <div className="mt-4">
                    <label className={LABEL}>Instagram URL</label>
                    <input
                      type="url"
                      value={form.detail.instagramUrl ?? ""}
                      onChange={(e) => setDetail("instagramUrl", e.target.value)}
                      placeholder="https://instagram.com/p/..."
                      className={INPUT}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-4 rounded-md bg-gradient-to-b from-primary-500 to-primary-700 text-white font-bold text-sm border border-white/20 shadow-[0_0_24px_rgba(8,134,253,0.4)] hover:shadow-[0_0_40px_rgba(8,134,253,0.6)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {saving ? "Saving..." : isEdit ? "Commit Changes" : "Deploy Project"}
                  </button>
                </div>

                {saveStatus === "success" && (
                  <p className="text-center text-green-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                    ✓ Mission Accomplished!
                  </p>
                )}
                {saveStatus === "error" && (
                  <p className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">
                    ✕ {errorMsg || "Save failed. Try again."}
                  </p>
                )}
              </form>
            </div>

            {/* Right: Collage layout */}
            <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">
                    Collage Layout
                  </h3>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">
                    Drag to reorder sequence
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-black text-primary-400 uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all"
                >
                  + Add Media
                </button>
              </div>

              {/* Live custom collage preview */}
              <div className="mb-8 p-4 rounded-[24px] bg-white/[0.02] border border-white/[0.05]">
                <label className="block text-[10px] uppercase font-black tracking-widest text-primary-400 mb-4 pl-1">
                  Live Custom Collage Preview
                </label>

                <div className="grid grid-cols-12 gap-2 w-full">
                  {gallery.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{ gridColumn: `span ${item.span || 12}` }}
                      className={`relative rounded-lg overflow-hidden border border-white/10 bg-black min-h-[50px] ${
                        (item.span || 12) === 12
                          ? "aspect-video"
                          : (item.span || 12) >= 6
                            ? "aspect-[4/3]"
                            : "aspect-square"
                      }`}
                    >
                      {item.src ? (
                        item.type === "video" ? (
                          <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-white/20 uppercase bg-primary-500/5">
                            Video
                          </div>
                        ) : (
                          <Image
                            src={item.src}
                            alt="Preview"
                            fill
                            className="object-cover opacity-60"
                            sizes="200px"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-white/5 uppercase">
                          Slot {idx + 1}
                        </div>
                      )}
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[6px] text-white/40 font-black">
                        {(item.span || 12) === 12
                          ? "FULL"
                          : (item.span || 12) === 6
                            ? "1/2"
                            : (item.span || 12) === 4
                              ? "1/3"
                              : "1/4"}
                      </div>
                    </div>
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-full h-40 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                      <span className="text-[10px] text-white/10 font-bold uppercase tracking-widest">
                        No Media Uploaded
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reordering items */}
              <Reorder.Group
                axis="y"
                values={gallery}
                onReorder={setGallery}
                className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {gallery.map((item, i) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 cursor-grab active:cursor-grabbing hover:border-primary-500/30 transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden relative shrink-0">
                        {item.src ? (
                          item.type === "video" ? (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-white/40 font-bold uppercase">
                              Video
                            </div>
                          ) : (
                            <Image
                              src={item.src}
                              alt="Reorder preview"
                              fill
                              className="object-cover"
                              sizes="100px"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-white/10 font-bold uppercase">
                            Empty
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <select
                            value={item.type}
                            onChange={(e) =>
                              updateGalleryItem(i, {
                                type: e.target.value as any,
                              })
                            }
                            className="bg-transparent text-[10px] font-black text-primary-400 uppercase tracking-widest focus:outline-none cursor-pointer"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                          <span className="text-[10px] text-white/10">•</span>
                          <div className="flex items-center gap-1">
                            {[
                              { val: 3, label: "1/4" },
                              { val: 4, label: "1/3" },
                              { val: 6, label: "1/2" },
                              { val: 12, label: "FULL" },
                            ].map((s) => (
                              <button
                                key={s.val}
                                type="button"
                                onClick={() =>
                                  updateGalleryItem(i, { span: s.val })
                                }
                                className={`px-1.5 h-5 flex items-center justify-center rounded text-[7px] font-black transition-all ${
                                  (item.span || 12) === s.val
                                    ? "bg-primary-500 text-white shadow-sm"
                                    : "bg-white/[0.03] text-white/30 hover:bg-white/10"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {!item.src ? (
                          <MediaUpload
                            label="Upload"
                            type={item.type}
                            accept={item.type === "video" ? "video/*" : "image/*"}
                            onUpload={(url) =>
                              updateGalleryItem(i, { src: url })
                            }
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updateGalleryItem(i, { src: "" })}
                              className="text-[9px] font-black uppercase text-white/40 hover:text-white transition-colors tracking-widest"
                            >
                              Replace
                            </button>
                            <button
                              type="button"
                              onClick={() => removeGalleryItem(i)}
                              className="text-[9px] font-black uppercase text-red-500/40 hover:text-red-500 transition-colors tracking-widest"
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        <input
                          value={item.alt}
                          onChange={(e) => updateGalleryItem(i, { alt: e.target.value })}
                          placeholder="Alt text / Caption"
                          className="w-full mt-2 px-2 py-1 bg-white/[0.02] border border-white/[0.08] rounded text-[10px] text-white focus:outline-none"
                        />
                      </div>

                      <div className="text-white/10 group-hover:text-white/30 transition-colors">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="8" y1="9" x2="16" y2="9" />
                          <line x1="8" y1="15" x2="16" y2="15" />
                        </svg>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              {gallery.length === 0 && (
                <div className="py-20 border-2 border-dashed border-white/[0.03] rounded-[32px] flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-4 text-xl">
                    🎞️
                  </div>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                    No media items in collage
                  </p>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="mt-4 text-primary-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all underline underline-offset-4"
                  >
                    Add Your First Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
