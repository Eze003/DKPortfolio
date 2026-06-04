import {
  Entity,
  PrimaryColumn,
  Column,
} from "typeorm";

export interface GalleryImage {
  src?: string;
  alt: string;
  placeholderClassName?: string;
}

export interface ProjectDetailData {
  client: string;
  year: string;
  projectType: string;
  description?: string;
  gallery: GalleryImage[];
  instagramUrl?: string;
}

@Entity("portfolio_project")
export class ProjectEntity {
  @PrimaryColumn({ type: "varchar", length: 100 })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  label!: string;

  @Column({ type: "varchar", length: 20 })
  kind!: string; // "app" | "file" | "folder"

  @Column({ type: "varchar", length: 20 })
  variant!: string; // "square" | "wide" | "tall"

  @Column({ type: "text", nullable: true })
  thumbnail!: string | null;

  @Column({ type: "simple-array", nullable: true })
  folderPreviews!: string[] | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  fallbackClassName!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  fallbackContent!: string | null;

  @Column({ type: "jsonb" })
  detail!: ProjectDetailData;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
