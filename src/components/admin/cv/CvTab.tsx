"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCv, CvData } from "@/hooks/useAdminData";

export default function CvTab() {
  const { data: cv, isLoading, refetch } = useCv();
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [downloadLabel, setDownloadLabel] = useState("Download CV");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const activeCv: CvData = cv ?? {
    id: "active_cv",
    fileName: "DIKE_Resume.pdf",
    fileUrl: "/cv.pdf",
    fileSize: "2.4 MB",
    updatedAt: "Oct 21, 2026",
    downloadLabel: "Download CV",
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    try {
      const timestamp = Math.round(Date.now() / 1000);
      const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "motiongads-portfolio";

      // 1. Get signed params
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paramsToSign: { timestamp, folder } }),
      });

      if (!signRes.ok) {
        throw new Error("Failed to authenticate upload with Cloudinary");
      }

      const { signature } = await signRes.json();
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

      // 2. Direct upload to Cloudinary (raw / auto)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey || "");
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        throw new Error("Upload to Cloudinary failed");
      }

      const uploadData = await uploadRes.json();
      const secureUrl = uploadData.secure_url;
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";

      // 3. Save to database
      const saveRes = await fetch("/api/admin/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileUrl: secureUrl,
          fileSize: sizeMB,
          downloadLabel: downloadLabel || activeCv.downloadLabel,
        }),
      });

      if (!saveRes.ok) throw new Error("Failed to save CV settings");

      setMessage({ text: "CV uploaded and activated successfully!", type: "success" });
      refetch();
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message || "Failed to upload CV", type: "error" });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl.trim() && !activeCv.fileUrl) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: fileName.trim() || activeCv.fileName,
          fileUrl: fileUrl.trim() || activeCv.fileUrl,
          fileSize: fileSize.trim() || activeCv.fileSize,
          downloadLabel: downloadLabel.trim() || activeCv.downloadLabel,
        }),
      });

      if (!res.ok) throw new Error("Failed to update CV settings");

      setMessage({ text: "CV metadata updated successfully!", type: "success" });
      refetch();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to update", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-2 leading-none">
          Document Management
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
          Curriculum Vitae (CV) &amp; Resume
        </h2>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-2xl border text-sm font-medium ${message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Card: Active CV Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c0c] p-6 sm:p-8 flex flex-col justify-between flex-1 relative overflow-hidden shadow-2xl">
            {/* Ambient backlight glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Document
                </span>
                <span className="text-xs text-white/40 font-medium">
                  Updated {activeCv.updatedAt}
                </span>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-inner">
                📄
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                {activeCv.fileName}
              </h3>

              <div className="flex items-center gap-4 text-xs text-white/50 mb-6">
                <span>Size: <strong className="text-white/80">{activeCv.fileSize || "PDF"}</strong></span>
                <span>&bull;</span>
                <span>Label: <strong className="text-white/80">{activeCv.downloadLabel}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-3">
              <a
                href={activeCv.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-white transition-all shadow-lg"
              >
                <span>View / Preview</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <a
                href={activeCv.fileUrl}
                download={activeCv.fileName}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Card: Upload New CV Dropzone & Custom Link */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Upload Dropzone */}
          <div className="rounded-3xl border-2 border-dashed border-white/10 bg-[#0c0c0c] p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:border-primary-500/50 hover:bg-white/[0.01] transition-all relative group">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              disabled={isUploading}
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />
            <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              )}
            </div>

            <h4 className="text-base font-bold text-white mb-1">
              {isUploading ? "Uploading & Storing CV..." : "Upload New CV File"}
            </h4>
            <p className="text-xs text-white/40 max-w-xs mb-4">
              Drag &amp; drop your resume (PDF or DOCX), or click anywhere in this area to browse.
            </p>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/80 group-hover:bg-primary-500 group-hover:text-white transition-all">
              Choose File
            </span>
          </div>

          {/* Manual Link / Settings */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c0c] p-6 sm:p-7 shadow-xl">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-white/70">
              Or Link An External Resume / Google Drive / Dropbox
            </h4>
            <form onSubmit={handleManualSave} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">
                  Direct File URL
                </label>
                <input
                  type="url"
                  placeholder={activeCv.fileUrl}
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">
                    File Name
                  </label>
                  <input
                    type="text"
                    placeholder={activeCv.fileName}
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">
                    Button Label
                  </label>
                  <input
                    type="text"
                    placeholder={activeCv.downloadLabel}
                    value={downloadLabel}
                    onChange={(e) => setDownloadLabel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
