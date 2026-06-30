import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { NSLessonPlan } from "@/common/enums/ELessonPlan";
import { BaseEntity, LessonPlan } from "@/entities";

@Entity("lesson_plan_writings")
export class LessonPlanWriting extends BaseEntity {
  @Column("uuid")
  lessonPlanId: string;

  @ManyToOne(() => LessonPlan, (lp) => lp.lessonPlanWritings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lessonPlanId" })
  lessonPlan: LessonPlan;

  @Column("uuid", { nullable: true })
  refId?: string;

  @Column({ type: "enum", enum: NSLessonPlan.ELessonPlanType, nullable: true })
  refType?: NSLessonPlan.ELessonPlanType;
}
