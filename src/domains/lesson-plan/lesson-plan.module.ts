import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonPlan, LessonPlanVocab, LessonPlanGrammar, LessonPlanListening, LessonPlanWriting } from "@/entities";
import {
    LessonPlanRepo, LessonPlanVocabRepo, LessonPlanGrammarRepo,
    LessonPlanListeningRepo, LessonPlanWritingRepo,
    GameRepo, TaskRepo, WordRepo,
} from "@/repositories";
import { LessonPlanService } from "./lesson-plan.service";
import { LessonPlanController } from "./lesson-plan.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        LessonPlan, LessonPlanVocab, LessonPlanGrammar,
        LessonPlanListening, LessonPlanWriting,
    ])],
    controllers: [LessonPlanController],
    providers: [
        LessonPlanRepo, LessonPlanVocabRepo, LessonPlanGrammarRepo,
        LessonPlanListeningRepo, LessonPlanWritingRepo,
        GameRepo, TaskRepo, WordRepo, LessonPlanService,
    ],
    exports: [LessonPlanService],
})
export class LessonPlanModule { }
