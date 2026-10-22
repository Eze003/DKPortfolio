"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProjectsRedirectPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      router.replace(`/project/${params.id}`);
    } else {
      router.replace("/projects");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}
