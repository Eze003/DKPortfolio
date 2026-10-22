import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("portfolio_cv")
export class CvEntity {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id!: string; // usually "active_cv"

  @Column({ type: "varchar", length: 255 })
  fileName!: string;

  @Column({ type: "text" })
  fileUrl!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  fileSize!: string | null;

  @Column({ type: "varchar", length: 100 })
  updatedAt!: string;

  @Column({ type: "varchar", length: 100, default: "Download CV" })
  downloadLabel!: string;
}
