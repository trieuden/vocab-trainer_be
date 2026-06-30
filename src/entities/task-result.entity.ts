import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Task, User } from "@/entities";

@Entity("task_results")
export class TaskResult extends BaseEntity {
  @Column("uuid")
  taskId: string;

  @ManyToOne(() => Task, (t) => t.taskResults, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "taskId" })
  task: Task;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (u) => u.taskResults, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "float" })
  score: number;

  @Column({ name: "grade_scale", type: "float" })
  gradeScale: number;

  @Column({ type: "int" })
  version: number;
}
