"use client";

import { useEffect, useState } from "react";
import type { ExperienceItem } from "@/data/experience";

type PublicExperiencesState = {
  experiences: ExperienceItem[];
  isLoading: boolean;
  error: string | null;
};

function parseExperience(value: unknown): ExperienceItem | null {
  if (typeof value !== "object" || value === null) return null;

  const experience = value as Record<string, unknown>;
  if (
    typeof experience.id !== "string" ||
    typeof experience.role !== "string" ||
    typeof experience.company !== "string" ||
    typeof experience.period !== "string"
  ) {
    return null;
  }

  return {
    id: experience.id,
    role: experience.role,
    company: experience.company,
    location: typeof experience.location === "string" ? experience.location : "",
    period: experience.period,
    description:
      typeof experience.description === "string" ? experience.description : "",
    skills: Array.isArray(experience.skills)
      ? experience.skills.filter((skill): skill is string => typeof skill === "string")
      : [],
  };
}

export function usePublicExperiences(): PublicExperiencesState {
  const [state, setState] = useState<PublicExperiencesState>({
    experiences: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadExperiences() {
      try {
        const response = await fetch("/api/experience", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const experiences: unknown = await response.json();
        if (!Array.isArray(experiences)) {
          throw new Error("The experience response contained invalid data");
        }

        const parsedExperiences = experiences.map(parseExperience);
        const validExperiences = parsedExperiences.filter(
          (experience): experience is ExperienceItem => experience !== null,
        );
        if (validExperiences.length !== experiences.length) {
          throw new Error("The experience response contained invalid data");
        }

        setState({
          experiences: validExperiences,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to load experience:", error);
        setState({
          experiences: [],
          isLoading: false,
          error: "Experience could not be loaded. Please try again later.",
        });
      }
    }

    loadExperiences();
    return () => controller.abort();
  }, []);

  return state;
}
