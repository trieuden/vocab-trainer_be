import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../../services/user/users.service';
import { User } from '../../entities/user.entity';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '@/shared/dtos/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
  })
  findById(id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create a new user',
  })
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('/update/:id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiOperation({
    summary: 'Update user by ID',
  })
  update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiOperation({
    summary: 'Delete user by ID',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get('/getUserByEmail/:email')
  @ApiParam({ name: 'email', required: true, description: 'User Email' })
  @ApiOperation({
    summary: 'Get user by Email',
  })
  findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Get('/getUserByUsername/:username')
  @ApiParam({ name: 'username', required: true, description: 'User Username' })
  @ApiOperation({
    summary: 'Get user by Username',
  })
  findByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findByUsername(username);
  }
}
