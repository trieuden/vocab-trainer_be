import { User } from '@/entities';
import { AuthRepository } from '@/repositories/auth.repository';
import { RegisterDto } from '@/shared/dtos/auth.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register(registerDto: RegisterDto): Promise<User> {
    return this.authRepository.register(registerDto);
  }

  login(user: User): Promise<{ accessToken: string }> {
    return this.authRepository.login(user);
  }
}
