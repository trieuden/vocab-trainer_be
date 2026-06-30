import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { NSLessonPlan } from "@/common/enums/ELessonPlan";
import { BaseEntity, LessonPlan } from "@/entities";

@Entity("lesson_plan_grammars")
export class LessonPlanGrammar extends BaseEntity {
  @Column("uuid")
  lessonPlanId: string;

  @ManyToOne(() => LessonPlan, (lp) => lp.lessonPlanGrammars, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lessonPlanId" })
  lessonPlan: LessonPlan;

  @Column("uuid", { nullable: true })
  refId?: string;

  @Column({ type: "enum", enum: NSLessonPlan.ELessonPlanType, nullable: true })
  refType?: NSLessonPlan.ELessonPlanType;
}
