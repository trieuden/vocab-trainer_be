import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LessonPlanGrammar } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class LessonPlanGrammarRepo extends Repo<LessonPlanGrammar> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(LessonPlanGrammar, dataSource);
  }
}
