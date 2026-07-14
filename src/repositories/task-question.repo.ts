import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TaskQuestion } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class TaskQuestionRepo extends Repo<TaskQuestion> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(TaskQuestion, dataSource);
  }
}
