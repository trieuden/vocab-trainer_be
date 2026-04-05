import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GameResult } from "@/entities";
import { GameResultService } from "./game-result.service";
import { CreateGameResultDto } from "./dtos/create-game-result.dto";
import { UpdateGameResultDto } from "./dtos/update-game-result.dto";

@ApiTags("Game results")
@Controller("game-results")
export class GameResultController {
  constructor(private readonly service: GameResultService) {}

  @Get()
  findAll(): Promise<GameResult[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<GameResult | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGameResultDto): Promise<GameResult> {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateGameResultDto,
  ): Promise<GameResult> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
