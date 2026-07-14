import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Answer } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class AnswerRepo extends Repo<Answer> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Answer, dataSource);
  }
}
