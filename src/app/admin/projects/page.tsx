"use client";

import { useProjects, useDeleteProject } from "@/hooks/useAdminData";
import ProjectsTab from "@/components/admin/projects/ProjectsTab";

export default function AdminProjectsPage() {
  const { data: projects = [], isLoading, refetch } = useProjects();
  const deleteProjectMutation = useDeleteProject();

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <ProjectsTab
            projects={projects}
            loading={isLoading}
            onDelete={(id) => deleteProjectMutation.mutate(id)}
            onRefresh={() => refetch()}
          />
        </div>
      </main>
    </div>
  );
}
