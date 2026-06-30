import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LessonPlanWriting } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class LessonPlanWritingRepo extends Repo<LessonPlanWriting> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(LessonPlanWriting, dataSource);
  }
}
