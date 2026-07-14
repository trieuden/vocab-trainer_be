import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { NSLessonPlan } from "@/common/enums/ELessonPlan";
import { User, BaseEntity, LessonPlanVocab, LessonPlanGrammar, LessonPlanListening, LessonPlanWriting, LessonPlanWarmup } from "@/entities";

@Entity("lesson_plans")
export class LessonPlan extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "enum", enum: NSLessonPlan.ELessonLevel })
  level: NSLessonPlan.ELessonLevel;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (u) => u.lessonPlans, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => LessonPlanVocab, (v) => v.lessonPlan, { cascade: true })
  lessonPlanVocabs?: LessonPlanVocab[];

  @OneToMany(() => LessonPlanGrammar, (g) => g.lessonPlan, { cascade: true })
  lessonPlanGrammars?: LessonPlanGrammar[];

  @OneToMany(() => LessonPlanListening, (l) => l.lessonPlan, { cascade: true })
  lessonPlanListenings?: LessonPlanListening[];

  @OneToMany(() => LessonPlanWriting, (w) => w.lessonPlan, { cascade: true })
  lessonPlanWritings?: LessonPlanWriting[];

  @OneToMany(() => LessonPlanWarmup, (w) => w.lessonPlan, { cascade: true })
  lessonPlanWarmups?: LessonPlanWarmup[];
}
