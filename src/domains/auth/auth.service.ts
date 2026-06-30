import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/entities";
import { UserService } from "@/domains/user/user.service";
import { RegisterDto } from "./dtos";
import { UserType } from "@/common/enums/EUser";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  register(dto: RegisterDto) {
    return this.userService.create({
      username: dto.username,
      password: dto.password,
      name: dto.name,
      email: dto.email,
      type: dto.type ?? UserType.STUDENT,
      isAdmin: dto.isAdmin ?? false,
      phone: dto.phone,
    });
  }

  async login(req: { user: User }){
    const user = req.user;
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || "default_secret_key",
      expiresIn: process.env.EXPIRES_IN || "3d",
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || "default_secret_key",
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });

    await this.userService.updateLastActiveAt(user.id);

    return { accessToken, refreshToken, user };
  }
}
