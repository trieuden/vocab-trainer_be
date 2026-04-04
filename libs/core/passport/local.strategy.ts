import { Injectable, ForbiddenException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { UserService } from "@/services/user/users.service";
import { UserStatus } from "@/shared/enums/user.enum";

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
        if (user.status === UserStatus.DELETED) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (user.status === UserStatus.BANNED) {
            throw new ForbiddenException("Your account has been suspended. Please contact the administrator.");
        }
        return user;
    }
}
