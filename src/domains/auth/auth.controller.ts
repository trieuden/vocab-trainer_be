import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@/entities";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { LocalAuthGuard } from "@/core/guards/local-auth.guard";
import { JwtAuthGuard } from "@/core/guards/jwt-auth.guard";
import { GetUser } from "@/decorators/get-user.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Đăng ký" })
  register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "Đăng nhập" })
  login(@Req() req: { user: User }, @Body() _body: LoginDto) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("profile")
  @ApiOperation({ summary: "Profile hiện tại" })
  getProfile(@GetUser() user: User): User {
    return user;
  }
}
