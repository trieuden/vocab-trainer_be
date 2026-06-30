import { Entity, Column, OneToMany, BeforeUpdate, BeforeInsert } from "typeorm";
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
import { hashPassword } from "libs/core/utils/password.utils";

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

  @OneToMany(() => StudentGroup, (g) => g.student)
  studentGroupsAsStudent?: StudentGroup[];

  @OneToMany(() => StudentGroup, (g) => g.teacher)
  studentGroupsAsTeacher?: StudentGroup[];

  @OneToMany(() => LessonPlan, (lp) => lp.user)
  lessonPlans?: LessonPlan[];

  @OneToMany(() => GameResult, (gr) => gr.user)
  gameResults?: GameResult[];

  @OneToMany(() => TaskResult, (tr) => tr.user)
  taskResults?: TaskResult[];

  @OneToMany(() => QuestionResult, (qr) => qr.user)
  questionResults?: QuestionResult[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const hashedPassword = await hashPassword(this.password)
      this.password = hashedPassword
    }
  }
}
