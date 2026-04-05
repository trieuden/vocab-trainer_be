import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { GameResult } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class GameResultRepo extends Repo<GameResult> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(GameResult, dataSource);
  }
}
