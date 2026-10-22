import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("portfolio_experience")
export class ExperienceEntity {
  @PrimaryColumn({ type: "varchar", length: 100 })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  role!: string;

  @Column({ type: "varchar", length: 255 })
  company!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location!: string | null;

  @Column({ type: "varchar", length: 100 })
  period!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "simple-array", nullable: true })
  skills!: string[] | null;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
