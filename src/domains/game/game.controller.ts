import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GameService } from "./game.service";
import { CreateGameDto, FindGameDto, UpdateGameDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Games")
@Controller("games")
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách" })
  find(@Body() dto: FindGameDto) {
    return this.service.find(dto);
  }


  @Post()
  create(@Body() dto: CreateGameDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateGameDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
