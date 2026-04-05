import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TaskResult } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class TaskResultRepo extends Repo<TaskResult> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(TaskResult, dataSource);
  }
}
