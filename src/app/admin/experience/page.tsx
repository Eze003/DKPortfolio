"use client";

import { useExperiences, useDeleteExperience } from "@/hooks/useAdminData";
import ExperienceTab from "@/components/admin/experience/ExperienceTab";

export default function AdminExperiencePage() {
  const { data: experiences = [], isLoading, refetch } = useExperiences();
  const deleteExperienceMutation = useDeleteExperience();

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <ExperienceTab
            experiences={experiences}
            loading={isLoading}
            onDelete={(id) => deleteExperienceMutation.mutate(id)}
            onRefresh={() => refetch()}
          />
        </div>
      </main>
    </div>
  );
}
