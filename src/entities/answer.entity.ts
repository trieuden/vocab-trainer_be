import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity, QuestionAnswer } from "@/entities";

@Entity("answers")
export class Answer extends BaseEntity {
  @Column({ type: "text" })
  answer: string;

  @Column({ name: "is_right", type: "boolean", default: false })
  isRight: boolean;

  @OneToMany(() => QuestionAnswer, (qa) => qa.answer, { lazy: true })
  questionAnswers?: Promise<QuestionAnswer[]>;
}
