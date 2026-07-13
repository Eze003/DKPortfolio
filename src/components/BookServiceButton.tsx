"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";

type BookServiceButtonProps = {
  label?: string;
  className?: string;
  variant?: "orange" | "green-pill";
};

export function BookServiceButton({
  label = "Book a Service",
  className = "",
  variant = "orange",
}: BookServiceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    details: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSubmitted(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {variant === "green-pill" ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", projectType: "", details: "" });
            setIsOpen(true);
          }}
          className={`flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#041a0f]/85 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-[#10b981]/60 hover:bg-[#062415] hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] ${className}`.trim()}
        >
          <BiSolidBadgeCheck className="text-[#10b981] text-lg" />
          {label}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", projectType: "", details: "" });
            setIsOpen(true);
          }}
          className={`rounded-full border border-[#10b981]/40 bg-[#10b981] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#059669] ${className}`.trim()}
        >
          {label}
        </button>
      )}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Book a service"
        >
          <div className="relative w-full max-w-2xl rounded-[28px] border border-white/10 bg-zinc-950/95 p-6 shadow-2xl shadow-black/50 sm:p-8">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSubmitted(false);
              }}
              className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-sm text-zinc-300 transition hover:text-white"
              aria-label="Close booking form"
            >
              ×
            </button>

            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]">
                Project inquiry
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Book a service
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
                Tell me what you are building and I will shape a direction that
                fits the mood, timing, and platform you need.
              </p>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#10b981]/30 bg-[#10b981]/10 p-5 text-sm text-zinc-200">
                <p className="font-semibold text-[#10b981]">
                  Request received.
                </p>
                <p className="mt-2 leading-7">
                  Thanks for reaching out. I will reach back within 24 hours
                  with a tailored next step.
                </p>
              </div>
            ) : (
              <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-zinc-300">
                    <span className="mb-2 block">Name</span>
                    <input
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 transition focus:border-[#10b981]"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="text-sm text-zinc-300">
                    <span className="mb-2 block">Email</span>
                    <input
                      required
                      type="email"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#10b981]"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>

                <label className="text-sm text-zinc-300">
                  <span className="mb-2 block">Project type</span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#10b981]"
                    placeholder="Brand, motion, packaging..."
                    value={formData.projectType}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="text-sm text-zinc-300">
                  <span className="mb-2 block">What do you need?</span>
                  <textarea
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#10b981]"
                    value={formData.details}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        details: event.target.value,
                      }))
                    }
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-sm text-zinc-400">
                    Prefer a quick chat? I can also send a direct response over
                    email.
                  </p>
                  <button
                    type="submit"
                    className="rounded-full bg-[#10b981] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#059669]"
                  >
                    Send request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
