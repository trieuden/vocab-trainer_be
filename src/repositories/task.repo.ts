import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Task } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class TaskRepo extends Repo<Task> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Task, dataSource);
  }
}
