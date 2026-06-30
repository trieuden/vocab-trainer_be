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
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto, FindUserDto, UpdateUserDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('list')
  @ApiOperation({ summary: "Danh sách user" })
  find(@Body() dto: FindUserDto) {
    return this.userService.find(dto);
  }


  @Post('create')
  @ApiOperation({ summary: "Tạo user" })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Cập nhật user" })
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa mềm user" })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
