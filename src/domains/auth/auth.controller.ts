import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@/entities";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos";
import { LocalAuthGuard } from "@/core/guards/local-auth.guard";
import { Public } from "@/core/decorators/public.decorator";
import { GetUser } from "@/decorators/get-user.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Đăng ký" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "Đăng nhập" })
  login(@Req() req: { user: User }, @Body() _body: LoginDto) {
    return this.authService.login(req);
  }

  @ApiBearerAuth("JWT-auth")
  @Get("profile")
  @ApiOperation({ summary: "Profile hiện tại" })
  getProfile(@GetUser() user: User) {
    return user;
  }
}
