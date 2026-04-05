import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Question, User } from "@/entities";

@Entity("question_results")
export class QuestionResult extends BaseEntity {
  @Column("uuid")
  questionId: string;

  @ManyToOne(() => Question, (q) => q.questionResults, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "questionId" })
  question: Promise<Question>;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (u) => u.questionResults, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @Column({ type: "int" })
  version: number;
}
