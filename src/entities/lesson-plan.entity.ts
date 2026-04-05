import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { LessonLevel, LessonPlanType } from "@/common/enums/ELessonPlan";
import { User, BaseEntity } from "@/entities";

@Entity("lesson_plans")
export class LessonPlan extends BaseEntity {
  @Column({ type: "enum", enum: LessonLevel })
  level: LessonLevel;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (u) => u.lessonPlans, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @Column("uuid", { nullable: true })
  warmUpId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  warmType?: LessonPlanType;

  @Column("uuid", { nullable: true })
  vocabId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  vocabType?: LessonPlanType;

  @Column("uuid", { nullable: true })
  grammarId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  grammarType?: LessonPlanType;

  @Column("uuid", { nullable: true })
  listeningId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  listeningType?: LessonPlanType;

  @Column("uuid", { nullable: true })
  readingId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  readingType?: LessonPlanType;

  @Column("uuid", { nullable: true })
  writingId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  writingType?: LessonPlanType;

  @Column("uuid", { nullable: true })
  speakingId?: string;

  @Column({ type: "enum", enum: LessonPlanType, nullable: true })
  speakingType?: LessonPlanType;
}
