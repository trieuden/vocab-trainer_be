import { Entity, Column, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { UserType } from "@/common/enums/EUser";
import {
  BaseEntity,
  StudentGroup,
  LessonPlan,
  GameResult,
  TaskResult,
  QuestionResult,
} from "@/entities";

@Entity("users")
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "enum", enum: UserType, default: UserType.STUDENT })
  type: UserType;

  @Column({ type: "timestamp", nullable: true })
  lastActiveAt?: Date;

  @Column({ type: "varchar", length: 255, unique: true })
  username: string;

  @Column({ type: "varchar", length: 255 })
  @Exclude()
  password: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone?: string;

  @Column({ type: "text", nullable: true })
  avatar?: string;

  @Column({ type: "boolean", default: false })
  isAdmin: boolean;

  @OneToMany(() => StudentGroup, (g) => g.student, { lazy: true })
  studentGroupsAsStudent?: Promise<StudentGroup[]>;

  @OneToMany(() => StudentGroup, (g) => g.teacher, { lazy: true })
  studentGroupsAsTeacher?: Promise<StudentGroup[]>;

  @OneToMany(() => LessonPlan, (lp) => lp.user, { lazy: true })
  lessonPlans?: Promise<LessonPlan[]>;

  @OneToMany(() => GameResult, (gr) => gr.user, { lazy: true })
  gameResults?: Promise<GameResult[]>;

  @OneToMany(() => TaskResult, (tr) => tr.user, { lazy: true })
  taskResults?: Promise<TaskResult[]>;

  @OneToMany(() => QuestionResult, (qr) => qr.user, { lazy: true })
  questionResults?: Promise<QuestionResult[]>;
}
