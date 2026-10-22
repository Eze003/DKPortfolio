import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@/components/admin/projects/ProjectCard";
import { BlogPost } from "@/data/blogs";
import { ExperienceItem } from "@/data/experience";
import { SocialItem } from "@/data/socials";

// ─── Projects Hooks ───────────────────────────────────

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ─── Blogs Hooks ──────────────────────────────────────

export function useBlogs() {
  return useQuery<BlogPost[]>({
    queryKey: ["admin_blogs"],
    queryFn: async () => {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

// ─── Experience Hooks ─────────────────────────────────

export function useExperiences() {
  return useQuery<ExperienceItem[]>({
    queryKey: ["admin_experiences"],
    queryFn: async () => {
      const res = await fetch("/api/admin/experience");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_experiences"] });
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
}

// ─── Socials Hooks ────────────────────────────────────

export function useSocials() {
  return useQuery<SocialItem[]>({
    queryKey: ["admin_socials"],
    queryFn: async () => {
      const res = await fetch("/api/admin/socials");
      if (!res.ok) throw new Error("Failed to fetch socials");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useDeleteSocial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/socials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_socials"] });
      queryClient.invalidateQueries({ queryKey: ["socials"] });
    },
  });
}

// ─── CV Hooks ─────────────────────────────────────────

export interface CvData {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  updatedAt: string;
  downloadLabel: string;
}

export function useCv() {
  return useQuery<CvData>({
    queryKey: ["admin_cv"],
    queryFn: async () => {
      const res = await fetch("/api/admin/cv");
      if (!res.ok) throw new Error("Failed to fetch CV info");
      return res.json();
    },
  });
}
