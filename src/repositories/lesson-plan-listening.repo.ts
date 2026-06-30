import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LessonPlanListening } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class LessonPlanListeningRepo extends Repo<LessonPlanListening> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(LessonPlanListening, dataSource);
  }
}
