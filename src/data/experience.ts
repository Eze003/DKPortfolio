export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
}

export const initialExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Motion & Brand Designer",
    company: "MotionsGaad Studio",
    location: "London, UK / Remote",
    period: "2023 — Present",
    description:
      "Leading high-impact brand identities, kinetic broadcast toolkits, 3D product visualizations, and motion design systems for global brands and creative agencies.",
    skills: ["After Effects", "Cinema 4D", "Brand Identity", "Design Systems", "Direction"],
  },
  {
    id: "exp-2",
    role: "Lead Visual & Motion Designer",
    company: "Apex Media Agency",
    location: "Amsterdam, NL",
    period: "2021 — 2023",
    description:
      "Directed motion campaigns, commercial festival reveals, and interactive digital experiences for esports leagues, automotive launches, and corporate brands.",
    skills: ["Motion Graphics", "3D Animation", "Commercial Film", "Art Direction"],
  },
  {
    id: "exp-3",
    role: "Digital & UI Designer",
    company: "NovaTech Innovations",
    location: "Remote",
    period: "2019 — 2021",
    description:
      "Crafted responsive digital brand interfaces, interactive design guidelines, micro-interactions, and design tokens for web and mobile platforms.",
    skills: ["Figma", "UI/UX", "Prototyping", "Design Tokens"],
  },
];
