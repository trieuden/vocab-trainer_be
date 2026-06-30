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
import { GameResultService } from "./game-result.service";
import { CreateGameResultDto, FindGameResultDto, UpdateGameResultDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Game results")
@Controller("game-results")
export class GameResultController {
  constructor(private readonly service: GameResultService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách" })
  find(@Body() dto: FindGameResultDto) {
    return this.service.find(dto);
  }


  @Post()
  create(@Body() dto: CreateGameResultDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateGameResultDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
