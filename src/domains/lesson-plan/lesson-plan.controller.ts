import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LessonPlanService } from "./lesson-plan.service";
import { CreateLessonPlanDto, FindLessonPlanDto, GetDetailDto, UpdateLessonPlanDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Lesson plans")
@Controller("lesson-plans")
export class LessonPlanController {
  constructor(private readonly service: LessonPlanService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách" })
  find(@Body() dto: FindLessonPlanDto) {
    return this.service.find(dto);
  }

  @Post()
  create(@Body() dto: CreateLessonPlanDto) {
    return this.service.create(dto);
  }

  @Post("detail")
  @ApiOperation({ summary: "Chi tiết" })
  getDetail(@Body() dto: GetDetailDto) {
    return this.service.getDetail(dto.id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateLessonPlanDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
