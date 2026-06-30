import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Game, Task } from "@/entities";

@Entity("words")
export class Word extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  words: string;

  @Column({ type: "text", nullable: true })
  definition?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  phoneticText?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  audio?: string;

  @Column("uuid", { nullable: true })
  gameId?: string;

  @ManyToOne(() => Game, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "gameId" })
  game?: Game;

  @Column("uuid", { nullable: true })
  taskId?: string;

  @ManyToOne(() => Task, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "taskId" })
  task?: Task;
}
