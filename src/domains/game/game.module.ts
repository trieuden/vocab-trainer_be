import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@/entities";
import { GameRepo } from "@/repositories/game.repo";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [GameRepo, GameService],
  exports: [GameService],
})
export class GameModule {}
