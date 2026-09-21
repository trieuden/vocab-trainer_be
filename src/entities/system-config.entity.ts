import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity("system_configs")
export class SystemConfig extends BaseEntity {
  @Column({ type: "varchar", length: 100, unique: true })
  code: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text" })
  value: string;
}
