import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LessonPlanWarmup } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class LessonPlanWarmupRepo extends Repo<LessonPlanWarmup> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(LessonPlanWarmup, dataSource);
  }
}
