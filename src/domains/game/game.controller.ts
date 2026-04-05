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
import { Game } from "@/entities";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dtos/create-game.dto";
import { UpdateGameDto } from "./dtos/update-game.dto";

@ApiTags("Games")
@Controller("games")
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get()
  findAll(): Promise<Game[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Game | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGameDto): Promise<Game> {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateGameDto): Promise<Game> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
