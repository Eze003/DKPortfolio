import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@/components/admin/projects/ProjectCard";

// ─── Projects Hooks ───────────────────────────────────

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      // The admin API returns an array directly
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
