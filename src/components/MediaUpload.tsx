"use client";

import { useRef, useState } from "react";

interface MediaUploadProps {
  /** Called with the secure Cloudinary URL once the upload succeeds */
  onUpload: (url: string) => void;
  label?: string;
  accept?: string;
  /** Controls the icon shown on the button */
  type?: "image" | "video";
}

export default function MediaUpload({
  onUpload,
  label = "Upload Image",
  accept = "image/*",
  type = "image",
}: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      await uploadToCloudinary(file);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed — check your Cloudinary env vars and try again.");
    } finally {
      setIsUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const timestamp = Math.round(Date.now() / 1000);
    const folder =
      process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "motiongads-portfolio";

    // 1. Fetch a signed request from our backend
    const signRes = await fetch("/api/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign: { timestamp, folder } }),
    });

    if (!signRes.ok) {
      throw new Error("Failed to get upload signature from server");
    }

    const { signature } = await signRes.json();

    // 2. Build FormData and POST directly to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ""
    );
    formData.append("folder", folder);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
    }

    // 3. Use XHR for live progress tracking
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) {
            onUpload(data.secure_url);
            resolve();
          } else {
            reject(new Error(data.error?.message || "No secure_url returned"));
          }
        } else {
          reject(new Error("Cloudinary upload failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(formData);
    });
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="relative w-full flex flex-col items-center justify-center py-6 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-200 group disabled:cursor-not-allowed disabled:opacity-70"
      >
        {/* Progress overlay */}
        {isUploading && (
          <div className="absolute inset-0 rounded-xl bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-2">
            <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
              Uploading
            </span>
            <span className="text-lg font-bold text-white">{progress}%</span>
            {/* Progress bar */}
            <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
          {type === "video" ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
        </div>

        <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-[10px] text-white/30 mt-0.5">
          Uploads to Cloudinary
        </span>
      </button>
    </div>
  );
}
