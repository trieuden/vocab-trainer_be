import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameResult } from "@/entities";
import { GameResultRepo } from "@/repositories/game-result.repo";
import { GameResultService } from "./game-result.service";
import { GameResultController } from "./game-result.controller";

@Module({
  imports: [TypeOrmModule.forFeature([GameResult])],
  controllers: [GameResultController],
  providers: [GameResultRepo, GameResultService],
  exports: [GameResultService],
})
export class GameResultModule {}
