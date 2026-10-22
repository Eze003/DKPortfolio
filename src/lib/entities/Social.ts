import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("portfolio_social")
export class SocialEntity {
  @PrimaryColumn({ type: "varchar", length: 100 })
  id!: string;

  @Column({ type: "varchar", length: 100 })
  platform!: string;

  @Column({ type: "varchar", length: 500 })
  url!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  username!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  icon!: string | null;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
