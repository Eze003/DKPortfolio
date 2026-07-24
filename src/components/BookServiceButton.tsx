"use client";

import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiSolidBadgeCheck } from "react-icons/bi";

type BookServiceButtonProps = {
  label?: string;
  className?: string;
  variant?: "orange" | "green-pill";
};

type FormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errs: FormErrors = {};
  if (!data.name.trim()) errs.name = "Name is required";
  else if (data.name.trim().length < 2) errs.name = "Name must be at least 2 characters";

  if (!data.email.trim()) errs.email = "Email is required";
  else if (!EMAIL_RE.test(data.email.trim())) errs.email = "Enter a valid email address";

  if (!data.service) errs.service = "Please select a service";

  if (data.message.trim().length > 0 && data.message.trim().length < 10)
    errs.message = "Message must be at least 10 characters if provided";

  return errs;
}

const EMPTY: FormData = { name: "", email: "", service: "", message: "" };

export function BookServiceButton({
  label = "Book a Service",
  className = "",
  variant = "orange",
}: BookServiceButtonProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const resetForm = () => {
    setSubmitted(false);
    setFormData(EMPTY);
    setErrors({});
    setTouched({});
  };

  const touch = (field: keyof FormData) =>
    setTouched((p) => ({ ...p, [field]: true }));

  const update = (field: keyof FormData, value: string) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (touched[field]) {
      const fresh = validate(next);
      setErrors((prev) => ({ ...prev, [field]: fresh[field] }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mark all touched
    setTouched({ name: true, email: true, service: true, message: true });
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  };

  return (
    <Dialog.Root onOpenChange={(open) => { if (open) resetForm(); }}>
      {/* ── Trigger ── */}
      <Dialog.Trigger asChild>
        {variant === "green-pill" ? (
          <button
            type="button"
            className={`flex items-center gap-2 rounded-full border border-[#0055FF]/30 bg-[#071221]/85 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-[#0055FF]/60 hover:bg-[#0a1c39] hover:shadow-[0_0_12px_rgba(0,85,255,0.15)] ${className}`.trim()}
          >
            <BiSolidBadgeCheck className="text-[#0055FF] text-lg" />
            {label}
          </button>
        ) : (
          <button
            type="button"
            className={`rounded-full border border-[#0055FF]/40 bg-[#0055FF] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#0040CC] ${className}`.trim()}
          >
            {label}
          </button>
        )}
      </Dialog.Trigger>

      {/* ── Portal ── */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm data-[state=open]:animate-[fadeIn_150ms_ease]" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0055FF]/10 via-zinc-950 to-violet-950/20 p-6 shadow-2xl shadow-black/60 backdrop-blur-lg focus:outline-none data-[state=open]:animate-[dialogIn_200ms_cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0055FF] mb-1">
                Project inquiry
              </p>
              <Dialog.Title className="text-2xl font-bold text-white">
                Book a service
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white transition text-base leading-none"
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {submitted ? (
            /* ── Success ── */
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0055FF]/15 border border-[#0055FF]/30">
                <BiSolidBadgeCheck className="text-[#0055FF] text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Request received!</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours with a tailored next step.
              </p>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-[#0055FF] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#0040CC] transition"
                >
                  Done
                </button>
              </Dialog.Close>
            </div>
          ) : (
            /* ── Form ── */
            <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                    Name <span className="text-[#0055FF]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-white placeholder-zinc-600 bg-white/5 outline-none transition ${
                      errors.name && touched.name
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-[#0055FF]/60"
                    }`}
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => touch("name")}
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                    Email <span className="text-[#0055FF]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-white placeholder-zinc-600 bg-white/5 outline-none transition ${
                      errors.email && touched.email
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-[#0055FF]/60"
                    }`}
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => touch("email")}
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                  Service needed <span className="text-[#0055FF]">*</span>
                </label>
                <select
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-white bg-zinc-900 outline-none transition appearance-none cursor-pointer ${
                    errors.service && touched.service
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 focus:border-[#0055FF]/60"
                  }`}
                  value={formData.service}
                  onChange={(e) => update("service", e.target.value)}
                  onBlur={() => touch("service")}
                >
                  <option value="" disabled>Select a service…</option>
                  <option value="Motion graphics">Motion graphics</option>
                  <option value="Video editing">Video editing</option>
                  <option value="Social media content">Social media content</option>
                  <option value="3D AI video">3D AI video</option>
                  <option value="Other">Other</option>
                </select>
                {errors.service && touched.service && (
                  <p className="mt-1 text-xs text-red-400">{errors.service}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                  Brief message
                  <span className="ml-1 text-zinc-600 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell me what you're building…"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-white placeholder-zinc-600 bg-white/5 outline-none transition resize-none ${
                    errors.message && touched.message
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 focus:border-[#0055FF]/60"
                  }`}
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => touch("message")}
                />
                {errors.message && touched.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-white/25 hover:text-white transition"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="rounded-full bg-[#0055FF] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#0040CC] transition"
                >
                  Send request
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
