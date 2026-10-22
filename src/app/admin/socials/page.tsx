"use client";

import { useSocials, useDeleteSocial } from "@/hooks/useAdminData";
import SocialsTab from "@/components/admin/socials/SocialsTab";

export default function AdminSocialsPage() {
  const { data: socials = [], isLoading, refetch } = useSocials();
  const deleteSocialMutation = useDeleteSocial();

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <SocialsTab
            socials={socials}
            loading={isLoading}
            onDelete={(id) => deleteSocialMutation.mutate(id)}
            onRefresh={() => refetch()}
          />
        </div>
      </main>
    </div>
  );
}
