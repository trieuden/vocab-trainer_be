import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonPlan } from "@/entities";
import { LessonPlanRepo } from "@/repositories/lesson-plan.repo";
import { LessonPlanService } from "./lesson-plan.service";
import { LessonPlanController } from "./lesson-plan.controller";

@Module({
  imports: [TypeOrmModule.forFeature([LessonPlan])],
  controllers: [LessonPlanController],
  providers: [LessonPlanRepo, LessonPlanService],
  exports: [LessonPlanService],
})
export class LessonPlanModule {}
