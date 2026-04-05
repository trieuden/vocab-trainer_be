import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Task, Question } from "@/entities";

@Entity("task_questions")
export class TaskQuestion extends BaseEntity {
  @Column("uuid")
  taskId: string;

  @ManyToOne(() => Task, (t) => t.taskQuestions, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "taskId" })
  task: Promise<Task>;

  @Column("uuid")
  questionId: string;

  @ManyToOne(() => Question, (q) => q.taskQuestions, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "questionId" })
  question: Promise<Question>;
}
