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
import { TaskService } from "./task.service";
import { CreateTaskDto, FindTaskDto, UpdateTaskDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách" })
  find(@Body() dto: FindTaskDto) {
    return this.service.find(dto);
  }


  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
