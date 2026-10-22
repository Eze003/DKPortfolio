import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("portfolio_blog")
export class BlogEntity {
  @PrimaryColumn({ type: "varchar", length: 150 })
  id!: string; // typically slug

  @Column({ type: "varchar", length: 150 })
  slug!: string;

  @Column({ type: "varchar", length: 100 })
  tag!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  subtitle!: string | null;

  @Column({ type: "varchar", length: 100 })
  date!: string;

  @Column({ type: "text" })
  image!: string;

  @Column({ type: "jsonb" })
  paragraphs!: string[];

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
