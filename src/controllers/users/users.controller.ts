import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "../../services/user/users.service";
import { User } from "../../entities/user.entity";
import { ApiOperation, ApiTags, ApiParam, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto } from "@/shared/dtos/user.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/core/guards/jwt-auth.guard";
import { Roles } from "@/core/decorators/roles.decorator";
import { RoleGuard } from "@/core/guards/role.guard";
import { Permission } from '@/core/decorators/permission.decorator';
import { PermissionGuard } from '@/core/guards/permission.guard';

@ApiTags("Users")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @ApiBearerAuth('JWT-auth')
    // @Permission('ADMIN_P_USERS')
    @Get()
    @ApiOperation({
        summary: "Get all users",
    })
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id/id")
    @ApiOperation({
        summary: "Get user by ID",
    })
    findById(id: string): Promise<User | null> {
        return this.userService.findById(id);
    }

    @Post("")
    @ApiOperation({
        summary: "Create a new user",
    })
    @ApiBody({type: CreateUserDto})
    @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
    @ApiConsumes('multipart/form-data')
    create(@Body() user: CreateUserDto, @UploadedFiles() files: { avatar?: Express.Multer.File[] }): Promise<User> {
        if (files?.avatar && files.avatar.length > 0) {
            user.avatar = files.avatar[0];
        }
        return this.userService.createUser(user);
    }

    @Put("/:id")
    @ApiParam({ name: "id", required: true, description: "User ID" })
    @ApiOperation({
        summary: "Update user by ID",
    })
    @ApiBody({type: UpdateUserDto})
    @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
    @ApiConsumes('multipart/form-data')
    update(@Param("id") id: string, @Body() user: UpdateUserDto, @UploadedFiles() files: { avatar?: Express.Multer.File[] }): Promise<User> {
        if (files?.avatar && files.avatar.length > 0) {
            user.avatar = files.avatar[0];
        }
        return this.userService.updateUser(id, user);
    }

    @Delete("/:id")
    @ApiParam({ name: "id", required: true, description: "User ID" })
    @ApiOperation({
        summary: "Delete user by ID",
    })
    delete(@Param("id") id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }

    @Get("/:email/email")
    @ApiParam({ name: "email", required: true, description: "User Email" })
    @ApiOperation({
        summary: "Get user by Email",
    })
    findByEmail(@Param("email") email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }

    @Get("/:username/username")
    @ApiParam({ name: "username", required: true, description: "User Username" })
    @ApiOperation({
        summary: "Get user by Username",
    })
    findByUsername(@Param("username") username: string): Promise<User | null> {
        return this.userService.findByUsername(username);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('JWT-auth')

    @Get(':roleName/role')
    @ApiOperation({
        summary: "Get all users by role",
    })
    findByRole(@Param("roleName") role: string): Promise<User[]> {
        return this.userService.findByRole(role);
    }
}
