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
import { Task } from "@/entities";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Task | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
