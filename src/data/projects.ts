export type ProjectIconVariant = "square" | "wide" | "tall";
export type ProjectKind = "app" | "file" | "folder";

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type ProjectGalleryImage = {
  src?: string;
  alt: string;
  placeholderClassName?: string;
};

export type ProjectDetail = {
  client: string;
  year: string;
  projectType: string;
  description?: string;
  gallery: ProjectGalleryImage[];
  instagramUrl?: string;
};

export type Project = {
  id: string;
  label: string;
  kind: ProjectKind;
  variant: ProjectIconVariant;
  thumbnail?: string;
  folderPreviews?: string[];
  fallbackClassName?: string;
  fallbackContent?: string;
  detail: ProjectDetail;
};

/** Icons per column — Windows fills top→bottom, then next column (from the right). */
export const DESKTOP_ROWS_PER_COLUMN = 5;

const defaultGallery = (label: string, seed: string): ProjectGalleryImage[] => [
  { src: img(`${seed}-a`, 800, 600), alt: `${label} — preview 1` },
  { src: img(`${seed}-b`, 800, 600), alt: `${label} — preview 2` },
];

const detail = (
  label: string,
  seed: string,
  overrides: Partial<ProjectDetail> &
    Pick<ProjectDetail, "client" | "year" | "projectType">,
): ProjectDetail => ({
  description: `Dummy case study for ${label}. Replace with your real project copy.`,
  gallery: defaultGallery(label, seed),
  ...overrides,
});

const file = (
  id: string,
  label: string,
  seed: string,
  variant: "wide" | "tall" = "wide",
  meta: Pick<ProjectDetail, "client" | "year" | "projectType"> &
    Partial<ProjectDetail>,
): Project => ({
  id,
  label,
  kind: "file",
  variant,
  thumbnail: img(seed, 112, 112),
  detail: detail(label, seed, meta),
});

const app = (
  id: string,
  label: string,
  seed: string,
  fallbackClassName: string,
  fallbackContent: string,
  meta: Pick<ProjectDetail, "client" | "year" | "projectType"> &
    Partial<ProjectDetail>,
): Project => ({
  id,
  label,
  kind: "app",
  variant: "square",
  fallbackClassName,
  fallbackContent,
  detail: detail(label, seed, meta),
});

/**
 * Order = desktop fill order (top → bottom, right column first).
 */
export const projects: Project[] = [
  app("visamie", "Visamie", "visamie", "bg-[#e53935]", "V", {
    client: "Visamie Inc.",
    year: "2025",
    projectType: "Brand identity",
    description: "Logo system, brand guidelines, and launch assets.",
  }),
  app("dodo-pizza", "Dodo Pizza", "dodo", "bg-[#f57c00]", "D", {
    client: "Dodo Brands",
    year: "2024",
    projectType: "Motion design",
    description: "TV spots, social cuts, and in-app motion toolkit.",
  }),
  {
    id: "logofolio",
    label: "Logofolio",
    kind: "folder",
    variant: "square",
    folderPreviews: [
      img("logo-a", 56, 56),
      img("logo-b", 56, 56),
      img("logo-c", 56, 56),
    ],
    detail: detail("Logofolio", "logofolio", {
      client: "Various clients",
      year: "2023–2026",
      projectType: "Logo design",
      description: "Collection of mark explorations and final logos.",
    }),
  },
  file("dfc", "DFC", "dfc", "wide", {
    client: "DFC League",
    year: "2025",
    projectType: "Event visuals",
    description: "Arena screens, posters, and fighter promo packages.",
  }),
  file("skin-club", "Skin.Club", "skinclub", "wide", {
    client: "Skin.Club",
    year: "2024",
    projectType: "3D & motion",
    description: "Product renders and neon-lit social loops.",
  }),
  {
    id: "renders-folder",
    label: "3D Renders",
    kind: "folder",
    variant: "square",
    folderPreviews: [
      img("render-a", 56, 56),
      img("render-b", 56, 56),
      img("render-c", 56, 56),
    ],
    detail: detail("3D Renders", "renders", {
      client: "Various clients",
      year: "2024–2026",
      projectType: "3D design",
      description: "Collection of 3D renders, modeling, and texturing projects.",
    }),
  },
  file("dala-camp", "DALA CAMP", "dalacamp", "wide", {
    client: "DALA",
    year: "2025",
    projectType: "Campaign film",
    description: "Director’s cut and teaser suite for summer camp launch.",
  }),
  file("megacampus", "Megacampus", "megacampus", "wide", {
    client: "Megacampus",
    year: "2024",
    projectType: "Corporate video",
    description: "Recruitment film and keynote opener animations.",
  }),
  {
    id: "motion-folder",
    label: "Motion Clips",
    kind: "folder",
    variant: "square",
    folderPreviews: [
      img("motion-a", 56, 56),
      img("motion-b", 56, 56),
      img("motion-c", 56, 56),
    ],
    detail: detail("Motion Clips", "motion", {
      client: "Various brands",
      year: "2023–2025",
      projectType: "Motion graphics",
      description: "A showcase of animated shorts, loops, and visual effects.",
    }),
  },
  app("geely-major", "Geely x Major", "geely", "bg-zinc-950 ring-1 ring-amber-500/50", "G", {
    client: "Geely × Major",
    year: "2025",
    projectType: "Automotive launch",
    description: "Reveal film, dealer kit, and digital showroom assets.",
  }),
  {
    id: "luz-ora",
    label: "Luz Ora",
    kind: "file",
    variant: "tall",
    thumbnail: img("luzora", 112, 112),
    detail: {
      client: "DIA Developments",
      year: "2026",
      projectType: "Renders retouch",
      description: "Architectural stills retouch and lifestyle compositing.",
      instagramUrl: "https://www.instagram.com/yernazar.design/",
      gallery: [
        {
          src: img("luzora-a", 800, 600),
          alt: "Luz Ora — pool and palms",
        },
        {
          src: img("luzora-b", 800, 600),
          alt: "Luz Ora — building facade",
        },
      ],
    },
  },
  file("neon-nights", "Neon Nights", "neonnights", "wide", {
    client: "Pulse Festival",
    year: "2024",
    projectType: "Poster series",
    description: "Key art and animated countdown for three city editions.",
  }),
  app("brew-lab", "Brew Lab", "brewlab", "bg-amber-800", "B", {
    client: "Brew Lab Co.",
    year: "2023",
    projectType: "Packaging",
    description: "Can labels, tap handles, and short product reels.",
  }),
  file("atlas-hotels", "Atlas Hotels", "atlas", "tall", {
    client: "Atlas Group",
    year: "2025",
    projectType: "Interior renders",
    description: "Lobby and suite visuals for investor deck.",
  }),
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: "motions-gaad" | "notes" | "instagram" | "telegram" | "whatsapp";
};

export const dockItems: DockItem[] = [
  { id: "motions-gaad", label: "Motions Gaad", href: "#", icon: "motions-gaad" },
  { id: "notes", label: "Notes", href: "#", icon: "notes" },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/yernazar.design/",
    icon: "instagram",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me",
    icon: "telegram",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me",
    icon: "whatsapp",
  },
];
