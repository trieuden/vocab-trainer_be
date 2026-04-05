import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Game } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class GameRepo extends Repo<Game> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Game, dataSource);
  }
}
