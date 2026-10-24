export type ProjectIconVariant = "square" | "wide" | "tall";
export type ProjectKind = "app" | "file" | "folder";

export const PROJECT_CARD_ASPECT_CLASSES: Record<ProjectIconVariant, string> = {
  square: "aspect-square",
  wide: "aspect-video",
  tall: "aspect-[3/4]",
};

export type ProjectGalleryImage = {
  src?: string;
  alt: string;
  placeholderClassName?: string;
  span?: number;
  type?: string;
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
  thumbnail?: string | null;
  folderPreviews?: string[] | null;
  fallbackClassName?: string | null;
  fallbackContent?: string | null;
  detail: ProjectDetail;
  sortOrder: number;
};

/** Icons per column — Windows fills top→bottom, then next column (from the right). */
export const DESKTOP_ROWS_PER_COLUMN = 5;

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
