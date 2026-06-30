import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Task, Question } from "@/entities";

@Entity("task_questions")
export class TaskQuestion extends BaseEntity {
  @Column("uuid")
  taskId: string;

  @ManyToOne(() => Task, (t) => t.taskQuestions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "taskId" })
  task: Task;

  @Column("uuid")
  questionId: string;

  @ManyToOne(() => Question, (q) => q.taskQuestions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "questionId" })
  question: Question;
}
