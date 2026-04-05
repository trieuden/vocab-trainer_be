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
import { TaskResult } from "@/entities";
import { TaskResultService } from "./task-result.service";
import { CreateTaskResultDto } from "./dtos/create-task-result.dto";
import { UpdateTaskResultDto } from "./dtos/update-task-result.dto";

@ApiTags("Task results")
@Controller("task-results")
export class TaskResultController {
  constructor(private readonly service: TaskResultService) {}

  @Get()
  findAll(): Promise<TaskResult[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<TaskResult | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTaskResultDto): Promise<TaskResult> {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateTaskResultDto,
  ): Promise<TaskResult> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
