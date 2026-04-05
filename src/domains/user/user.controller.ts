import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "@/entities";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Danh sách user" })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("search")
  @ApiOperation({ summary: "Tìm user" })
  search(@Query("q") q?: string): Promise<User[]> {
    return this.userService.search(q);
  }

  @Get(":id")
  @ApiOperation({ summary: "Chi tiết user" })
  findOne(@Param("id") id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Tạo user" })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Cập nhật user" })
  update(@Param("id") id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa mềm user" })
  remove(@Param("id") id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
