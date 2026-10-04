import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
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
  @ApiOperation({ summary: "Danh sách giáo án" })
  find(@Body() dto: FindLessonPlanDto) {
    return this.service.find(dto);
  }

  @Post()
  @ApiOperation({ summary: "Tạo giáo án" })
  create(@Body() dto: CreateLessonPlanDto) {
    return this.service.create(dto);
  }

  @Post("detail")
  @ApiOperation({ summary: "Chi tiết giáo án" })
  getDetail(@Body() dto: GetDetailDto) {
    return this.service.getDetail(dto.id);
  }

  @Put("update")
  @ApiOperation({ summary: "Cập nhật giáo án" })
  update(@Body() dto: UpdateLessonPlanDto) {
    return this.service.update(dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa giáo án" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
