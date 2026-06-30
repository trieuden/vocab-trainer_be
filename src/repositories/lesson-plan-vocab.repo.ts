import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LessonPlanVocab } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class LessonPlanVocabRepo extends Repo<LessonPlanVocab> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(LessonPlanVocab, dataSource);
  }
}
