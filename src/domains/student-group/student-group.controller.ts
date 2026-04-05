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
import { StudentGroup } from "@/entities";
import { StudentGroupService } from "./student-group.service";
import { CreateStudentGroupDto } from "./dtos/create-student-group.dto";
import { UpdateStudentGroupDto } from "./dtos/update-student-group.dto";

@ApiTags("Student groups")
@Controller("student-groups")
export class StudentGroupController {
  constructor(private readonly service: StudentGroupService) {}

  @Get()
  @ApiOperation({ summary: "Danh sách" })
  findAll(): Promise<StudentGroup[]> {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Chi tiết" })
  findOne(@Param("id") id: string): Promise<StudentGroup | null> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Tạo" })
  create(@Body() dto: CreateStudentGroupDto): Promise<StudentGroup> {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Cập nhật" })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateStudentGroupDto,
  ): Promise<StudentGroup> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa mềm" })
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
