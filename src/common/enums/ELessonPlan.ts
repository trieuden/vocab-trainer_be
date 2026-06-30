export namespace NSLessonPlan {
  /** Cấp độ giáo án — `lesson_plans.level` */
  export enum ELessonLevel {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
  }

  export enum ELessonPlanType {
    GAME = "GAME",
    TASK = "TASK",
  }

  export enum ESectionName {
    FLASHCARD = "FLASHCARD",
    CROSSWORD = "CROSSWORD",

    QUIZ = "QUIZ",
    MATCHING = "MATCHING",
    FILL_BLANK = "FILL_BLANK",
    LISTENING = "LISTENING",
    SPEAKING = "SPEAKING",
    WRITING = "WRITING",
  }

}