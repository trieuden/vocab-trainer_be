import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Question } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class QuestionRepo extends Repo<Question> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Question, dataSource);
  }
}
