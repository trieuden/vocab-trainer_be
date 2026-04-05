import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LessonPlan } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class LessonPlanRepo extends Repo<LessonPlan> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(LessonPlan, dataSource);
  }
}
