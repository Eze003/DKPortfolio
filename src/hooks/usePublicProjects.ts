"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

type PublicProjectsState = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
};

function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) return false;

  const project = value as Partial<Project>;
  return (
    typeof project.id === "string" &&
    typeof project.label === "string" &&
    typeof project.kind === "string" &&
    typeof project.variant === "string" &&
    typeof project.sortOrder === "number" &&
    typeof project.detail === "object" &&
    project.detail !== null &&
    typeof project.detail.client === "string" &&
    typeof project.detail.year === "string" &&
    typeof project.detail.projectType === "string" &&
    Array.isArray(project.detail.gallery)
  );
}

export function usePublicProjects(): PublicProjectsState {
  const [state, setState] = useState<PublicProjectsState>({
    projects: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const projects: unknown = await response.json();
        if (!Array.isArray(projects) || !projects.every(isProject)) {
          throw new Error("The projects response contained invalid data");
        }

        setState({ projects, isLoading: false, error: null });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to load projects:", error);
        setState({
          projects: [],
          isLoading: false,
          error: "Projects could not be loaded. Please try again later.",
        });
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  return state;
}
