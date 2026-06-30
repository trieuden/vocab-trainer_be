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
import { StudentGroupService } from "./student-group.service";
import { CreateStudentGroupDto, FindStudentGroupDto, UpdateStudentGroupDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Student groups")
@Controller("student-groups")
export class StudentGroupController {
  constructor(private readonly service: StudentGroupService) {}

  @Post("list")
  @ApiOperation({ summary: "Danh sách" })
  find(@Body() dto: FindStudentGroupDto) {
    return this.service.find(dto);
  }


  @Post()
  @ApiOperation({ summary: "Tạo" })
  create(@Body() dto: CreateStudentGroupDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Cập nhật" })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateStudentGroupDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa mềm" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
