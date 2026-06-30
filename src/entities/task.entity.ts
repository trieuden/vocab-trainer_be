import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity, TaskResult, TaskQuestion, Word, User } from "@/entities";

@Entity("tasks")
export class Task extends BaseEntity {
  @Column("uuid", { nullable: true })
  parentId?: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentId" })
  user: User;

  @Column({ type: "varchar", length: 500 })
  name: string;

  @OneToMany(() => TaskResult, (tr) => tr.task)
  taskResults?: TaskResult[];

  @OneToMany(() => TaskQuestion, (tq) => tq.task)
  taskQuestions?: TaskQuestion[];

  @OneToMany(() => Word, (w) => w.task)
  words?: Word[];
}
