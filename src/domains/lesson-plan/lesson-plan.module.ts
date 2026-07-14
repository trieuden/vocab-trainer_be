import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    LessonPlan, LessonPlanVocab, LessonPlanGrammar,
    LessonPlanListening, LessonPlanWriting, LessonPlanWarmup,
    Question, Answer, TaskQuestion, QuestionAnswer,
} from "@/entities";
import {
    LessonPlanRepo, LessonPlanVocabRepo, LessonPlanGrammarRepo,
    LessonPlanListeningRepo, LessonPlanWritingRepo, LessonPlanWarmupRepo,
    GameRepo, TaskRepo, WordRepo,
    QuestionRepo, AnswerRepo, TaskQuestionRepo, QuestionAnswerRepo,
} from "@/repositories";
import { LessonPlanService } from "./lesson-plan.service";
import { LessonPlanController } from "./lesson-plan.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        LessonPlan, LessonPlanVocab, LessonPlanGrammar,
        LessonPlanListening, LessonPlanWriting, LessonPlanWarmup,
        Question, Answer, TaskQuestion, QuestionAnswer,
    ])],
    controllers: [LessonPlanController],
    providers: [
        LessonPlanRepo, LessonPlanVocabRepo, LessonPlanGrammarRepo,
        LessonPlanListeningRepo, LessonPlanWritingRepo, LessonPlanWarmupRepo,
        GameRepo, TaskRepo, WordRepo,
        QuestionRepo, AnswerRepo, TaskQuestionRepo, QuestionAnswerRepo,
        LessonPlanService,
    ],
    exports: [LessonPlanService],
})
export class LessonPlanModule { }
