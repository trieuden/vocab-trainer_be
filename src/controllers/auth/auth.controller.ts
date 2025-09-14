import { Body, Controller, Post, Req, Get } from '@nestjs/common';
import { AuthService } from '@/services/auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@/entities';
import { RegisterDto } from '@/shared/dtos/auth.dto';
import { LocalAuthGuard } from '@/core/guards/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/core/guards/jwt-auth.guard';

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
  login(@Req() req: any): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: any): User {
    return req.user;
  }
}
