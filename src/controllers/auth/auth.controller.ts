import { Body, Controller, Post, Req, Get } from '@nestjs/common';
import { AuthService } from '@/services/auth/auth.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@/entities';
import { LoginDto, RegisterDto } from '@/shared/dtos/auth.dto';
import { LocalAuthGuard } from '@/core/guards/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/core/guards/jwt-auth.guard';
import { GetUser } from '@/decorators/get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'Register a new user',
  })
  register(@Body() user: RegisterDto): Promise<User> {
    return this.authService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: 'Login user',
  })
  login(@Req() req: any, @Body() user: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/profile')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Returns the profile information of the currently authenticated user'
  })
  getProfile(@GetUser() user: User): User {
    return user;
  }
}
