import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../services/user/users.service';
import { User } from '../../entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  findAll(): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }
}
