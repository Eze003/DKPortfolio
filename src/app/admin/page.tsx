"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────
interface GalleryImage {
  src?: string;
  alt: string;
  placeholderClassName?: string;
}

interface ProjectDetail {
  client: string;
  year: string;
  projectType: string;
  description?: string;
  gallery: GalleryImage[];
  instagramUrl?: string;
}

interface Project {
  id: string;
  label: string;
  kind: string;
  variant: string;
  thumbnail?: string;
  folderPreviews?: string[];
  fallbackClassName?: string;
  fallbackContent?: string;
  detail: ProjectDetail;
  sortOrder: number;
}

const EMPTY_PROJECT: Omit<Project, "sortOrder"> = {
  id: "",
  label: "",
  kind: "app",
  variant: "square",
  thumbnail: "",
  fallbackClassName: "",
  fallbackContent: "",
  detail: {
    client: "",
    year: new Date().getFullYear().toString(),
    projectType: "",
    description: "",
    gallery: [{ src: "", alt: "" }],
    instagramUrl: "",
  },
};

// ── Helpers ────────────────────────────────────────────────────
async function apiFetch(
  url: string,
  opts?: RequestInit,
): Promise<{ ok: boolean; data: unknown; status: number }> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, data, status: res.status };
}

// ── Sub-components ─────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
        {label}
      </label>
      {children}
    </div>
  );
}

const INPUT =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/10";
const BTN_PRIMARY =
  "flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95 disabled:opacity-50 cursor-pointer";
const BTN_GHOST =
  "flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 active:scale-95 cursor-pointer";
const BTN_DANGER =
  "flex items-center justify-center gap-2 rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/30 active:scale-95 cursor-pointer";

// ── Project Form Modal ─────────────────────────────────────────
function ProjectFormModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<Project> | null;
  onSave: (data: Partial<Project>) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState<Omit<Project, "sortOrder">>(
    initial ? { ...EMPTY_PROJECT, ...initial } : { ...EMPTY_PROJECT },
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }
  function setDetail<K extends keyof ProjectDetail>(
    k: K,
    v: ProjectDetail[K],
  ) {
    setForm((prev) => ({ ...prev, detail: { ...prev.detail, [k]: v } }));
  }
  function setGallery(idx: number, field: keyof GalleryImage, val: string) {
    setForm((prev) => {
      const g = [...prev.detail.gallery];
      g[idx] = { ...g[idx], [field]: val };
      return { ...prev, detail: { ...prev.detail, gallery: g } };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id || !form.label) {
      setErr("ID and Label are required.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      await onSave(form);
      onClose();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close editor"
      />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 transition hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {err && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {err}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="ID (slug)">
              <input
                className={INPUT}
                value={form.id}
                onChange={(e) => set("id", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="e.g. my-project"
                disabled={isEdit}
              />
            </Field>
            <Field label="Label">
              <input
                className={INPUT}
                value={form.label}
                onChange={(e) => set("label", e.target.value)}
                placeholder="Display name"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kind">
              <select
                className={INPUT}
                value={form.kind}
                onChange={(e) => set("kind", e.target.value)}
              >
                <option value="app">App</option>
                <option value="file">File</option>
                <option value="folder">Folder</option>
              </select>
            </Field>
            <Field label="Variant">
              <select
                className={INPUT}
                value={form.variant}
                onChange={(e) => set("variant", e.target.value)}
              >
                <option value="square">Square</option>
                <option value="wide">Wide</option>
                <option value="tall">Tall</option>
              </select>
            </Field>
          </div>

          <Field label="Thumbnail URL">
            <input
              className={INPUT}
              value={form.thumbnail ?? ""}
              onChange={(e) => set("thumbnail", e.target.value)}
              placeholder="https://..."
            />
          </Field>

          {form.kind === "app" && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Fallback BG class">
                <input
                  className={INPUT}
                  value={form.fallbackClassName ?? ""}
                  onChange={(e) => set("fallbackClassName", e.target.value)}
                  placeholder="bg-[#e53935]"
                />
              </Field>
              <Field label="Fallback letter">
                <input
                  className={INPUT}
                  value={form.fallbackContent ?? ""}
                  onChange={(e) => set("fallbackContent", e.target.value)}
                  placeholder="V"
                  maxLength={3}
                />
              </Field>
            </div>
          )}

          <div className="border-t border-white/10 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Project Details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Client">
                <input
                  className={INPUT}
                  value={form.detail.client}
                  onChange={(e) => setDetail("client", e.target.value)}
                />
              </Field>
              <Field label="Year">
                <input
                  className={INPUT}
                  value={form.detail.year}
                  onChange={(e) => setDetail("year", e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Project Type">
                <input
                  className={INPUT}
                  value={form.detail.projectType}
                  onChange={(e) => setDetail("projectType", e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Description">
                <textarea
                  className={`${INPUT} resize-none`}
                  rows={3}
                  value={form.detail.description ?? ""}
                  onChange={(e) => setDetail("description", e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Instagram URL">
                <input
                  className={INPUT}
                  value={form.detail.instagramUrl ?? ""}
                  onChange={(e) => setDetail("instagramUrl", e.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </Field>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Gallery
              </p>
              <button
                type="button"
                className={BTN_GHOST}
                onClick={() =>
                  setDetail("gallery", [
                    ...form.detail.gallery,
                    { src: "", alt: "" },
                  ])
                }
              >
                + Add image
              </button>
            </div>
            <div className="space-y-3">
              {form.detail.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-white/10 p-3"
                >
                  <div className="flex-1 space-y-2">
                    <input
                      className={INPUT}
                      value={img.src ?? ""}
                      onChange={(e) => setGallery(idx, "src", e.target.value)}
                      placeholder="Image URL"
                    />
                    <input
                      className={INPUT}
                      value={img.alt}
                      onChange={(e) => setGallery(idx, "alt", e.target.value)}
                      placeholder="Alt text"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-1 shrink-0 text-white/30 transition hover:text-red-400"
                    onClick={() => {
                      const g = form.detail.gallery.filter((_, i) => i !== idx);
                      setDetail("gallery", g.length ? g : [{ src: "", alt: "" }]);
                    }}
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className={BTN_GHOST} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={BTN_PRIMARY} disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete Confirmation Modal ───────────────────────────────────
function DeleteConfirmModal({
  projectName,
  onConfirm,
  onClose,
  deleting,
}: {
  projectName: string;
  onConfirm: () => void;
  onClose: () => void;
  deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-white">“{projectName}”</span>? This action is permanent and cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className={BTN_GHOST}
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [logging, setLogging] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [editTarget, setEditTarget] = useState<Partial<Project> | null | "new">(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  // Check session on mount
  useEffect(() => {
    apiFetch("/api/admin/projects").then(({ ok }) => setAuthed(ok));
  }, []);

  async function loadProjects() {
    setLoading(true);
    const { ok, data } = await apiFetch("/api/admin/projects");
    if (ok) setProjects(data as Project[]);
    setLoading(false);
  }

  useEffect(() => {
    if (authed) {
      const t = setTimeout(() => { loadProjects(); }, 0);
      return () => clearTimeout(t);
    }
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLogging(true);
    setLoginErr("");
    const { ok } = await apiFetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    setLogging(false);
    if (ok) {
      setAuthed(true);
    } else {
      setLoginErr("Wrong password — try again.");
    }
  }

  async function handleLogout() {
    await apiFetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setProjects([]);
  }

  async function handleSave(data: Partial<Project>) {
    const isEdit = Boolean(editTarget && editTarget !== "new" && editTarget.id);
    const { ok, data: result } = isEdit
      ? await apiFetch(`/api/admin/projects/${data.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        })
      : await apiFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(data),
        });

    if (!ok) {
      const err = (result as { error?: string })?.error ?? "Unknown error";
      throw new Error(err);
    }
    showToast(isEdit ? "Project updated ✓" : "Project created ✓");
    await loadProjects();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { ok } = await apiFetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    if (ok) {
      showToast("Project deleted.");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmProject(null);
    } else {
      showToast("Delete failed.", "err");
    }
  }

  // ── Loading state ────────────────────────────────────────────
  if (authed === null) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  // ── Login ────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white">
              M
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="mt-1 text-sm text-white/40">MotionsGaad Portfolio</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            {loginErr && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                {loginErr}
              </p>
            )}
            <Field label="Password">
              <input
                type="password"
                className={INPUT}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                autoComplete="current-password"
              />
            </Field>
            <button
              type="submit"
              className={`${BTN_PRIMARY} w-full`}
              disabled={logging}
            >
              {logging ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────
  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-xl border px-5 py-3 text-sm font-medium shadow-xl transition-all duration-300 ${
            toast.type === "err"
              ? "border-red-500/30 bg-red-500/10 text-red-400"
              : "border-white/15 bg-white/10 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
              M
            </div>
            <span className="font-semibold">MotionsGaad Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className={BTN_GHOST}
            >
              View site ↗
            </a>
            <button className={BTN_GHOST} onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Page title + new button */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="mt-0.5 text-sm text-white/40">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button className={BTN_PRIMARY} onClick={() => setEditTarget("new")}>
            + New project
          </button>
        </div>

        {/* Projects table */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          ) : projects.length === 0 ? (
            <div className="py-24 text-center text-white/30">
              <p className="text-4xl">📁</p>
              <p className="mt-3 text-sm">No projects yet. Create one!</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-widest text-white/40">
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Kind</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Year</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="group border-b border-white/5 transition-colors last:border-none hover:bg-white/3"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.thumbnail}
                            alt=""
                            className="h-9 w-9 rounded-lg object-cover"
                          />
                        ) : (
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white ${p.fallbackClassName ?? "bg-zinc-800"}`}
                          >
                            {p.fallbackContent || p.label[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">{p.label}</p>
                          <p className="text-xs text-white/40">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize">
                        {p.kind}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/60">
                      {p.detail.client}
                    </td>
                    <td className="px-5 py-4 text-white/60">{p.detail.year}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className={BTN_GHOST}
                          onClick={() => setEditTarget(p)}
                        >
                          Edit
                        </button>
                        <button
                          className={BTN_DANGER}
                          onClick={() => setDeleteConfirmProject(p)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Editor modal */}
      {editTarget !== null && (
        <ProjectFormModal
          initial={editTarget === "new" ? null : editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmProject !== null && (
        <DeleteConfirmModal
          projectName={deleteConfirmProject.label}
          onConfirm={() => handleDelete(deleteConfirmProject.id)}
          onClose={() => setDeleteConfirmProject(null)}
          deleting={deletingId === deleteConfirmProject.id}
        />
      )}
    </div>
  );
}
