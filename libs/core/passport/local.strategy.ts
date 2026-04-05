import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { UserService } from "@/domains/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: "username",
      passwordField: "password",
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (user.isDeleted) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }
}
