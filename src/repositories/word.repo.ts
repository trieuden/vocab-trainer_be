import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Word } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class WordRepo extends Repo<Word> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Word, dataSource);
  }
}
