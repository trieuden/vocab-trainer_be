import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@/services/user/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'a33a86b54075c68f89ee848dde0339317a136d2e6800eaee85883716db25f05d',
    });
  }

  async validate(payload: any) {
    const username = payload.username;
    const user = await this.userService.findByUsername(username);
    return user;
  }
}
