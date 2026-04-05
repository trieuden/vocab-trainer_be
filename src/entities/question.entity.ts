import { Entity, Column, OneToMany } from "typeorm";
import { QuestionType } from "@/common/enums/EQuestion";
import {
  BaseEntity,
  TaskQuestion,
  QuestionResult,
  QuestionAnswer,
} from "@/entities";

@Entity("questions")
export class Question extends BaseEntity {
  @Column({ type: "text", nullable: true })
  question?: string;

  @Column("uuid")
  answerGroupId: string;

  @Column({ type: "enum", enum: QuestionType })
  type: QuestionType;

  @Column({ type: "varchar", length: 255 })
  key: string;

  @Column({ type: "text", nullable: true })
  transcript?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  audio?: string;

  @Column({ type: "jsonb", nullable: true })
  images?: string[];

  @OneToMany(() => TaskQuestion, (tq) => tq.question, { lazy: true })
  taskQuestions?: Promise<TaskQuestion[]>;

  @OneToMany(() => QuestionResult, (qr) => qr.question, { lazy: true })
  questionResults?: Promise<QuestionResult[]>;

  @OneToMany(() => QuestionAnswer, (qa) => qa.question, { lazy: true })
  questionAnswers?: Promise<QuestionAnswer[]>;
}
