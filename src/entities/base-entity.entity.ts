import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "uuid", nullable: true })
  createdBy?: string;

  @Column({ type: "uuid", nullable: true })
  updatedBy?: string;

  @Column({ type: "boolean", default: false })
  isDeleted: boolean;
}
