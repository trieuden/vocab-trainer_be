import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { QuestionAnswer } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class QuestionAnswerRepo extends Repo<QuestionAnswer> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(QuestionAnswer, dataSource);
  }
}
