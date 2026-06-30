import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Question, User } from "@/entities";

@Entity("question_results")
export class QuestionResult extends BaseEntity {
  @Column("uuid")
  questionId: string;

  @ManyToOne(() => Question, (q) => q.questionResults, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "questionId" })
  question: Question;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (u) => u.questionResults, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "int" })
  version: number;
}
