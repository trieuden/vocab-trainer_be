import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity, TaskResult, TaskQuestion } from "@/entities";

@Entity("tasks")
export class Task extends BaseEntity {
  @Column("uuid", { nullable: true })
  parentId?: string;

  @ManyToOne(() => Task, (t) => t.children, {
    nullable: true,
    onDelete: "SET NULL",
    lazy: true,
  })
  @JoinColumn({ name: "parentId" })
  parent?: Promise<Task>;

  @OneToMany(() => Task, (t) => t.parent, { lazy: true })
  children: Promise<Task[]>;

  @Column({ type: "varchar", length: 500 })
  name: string;

  @OneToMany(() => TaskResult, (tr) => tr.task, { lazy: true })
  taskResults?: Promise<TaskResult[]>;

  @OneToMany(() => TaskQuestion, (tq) => tq.task, { lazy: true })
  taskQuestions?: Promise<TaskQuestion[]>;
}
