import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LessonPlan } from "@/entities";
import { LessonPlanService } from "./lesson-plan.service";
import { CreateLessonPlanDto } from "./dtos/create-lesson-plan.dto";
import { UpdateLessonPlanDto } from "./dtos/update-lesson-plan.dto";

@ApiTags("Lesson plans")
@Controller("lesson-plans")
export class LessonPlanController {
  constructor(private readonly service: LessonPlanService) {}

  @Get()
  findAll(): Promise<LessonPlan[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<LessonPlan | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLessonPlanDto): Promise<LessonPlan> {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateLessonPlanDto,
  ): Promise<LessonPlan> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
