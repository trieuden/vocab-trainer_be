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
import { TaskResultService } from "./task-result.service";
import { CreateTaskResultDto, FindTaskResultDto, UpdateTaskResultDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Task results")
@Controller("task-results")
export class TaskResultController {
  constructor(private readonly service: TaskResultService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách" })
  find(@Body() dto: FindTaskResultDto) {
    return this.service.find(dto);
  }

  @Post()
  create(@Body() dto: CreateTaskResultDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateTaskResultDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
