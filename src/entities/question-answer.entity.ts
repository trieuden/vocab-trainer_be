import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Answer, Question } from "@/entities";

@Entity("question_answers")
export class QuestionAnswer extends BaseEntity {
  @Column("uuid")
  answerId: string;

  @ManyToOne(() => Answer, (a) => a.questionAnswers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "answerId" })
  answer: Answer;

  @Column("uuid")
  questionId: string;

  @ManyToOne(() => Question, (q) => q.questionAnswers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "questionId" })
  question: Question;
}
