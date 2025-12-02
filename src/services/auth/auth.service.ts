import { User } from '@/entities';
import { AuthRepository } from '@/repositories/auth.repository';
import { LoginDto, RegisterDto } from '@/shared/dtos/auth.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register(registerDto: RegisterDto): Promise<User> {
    return this.authRepository.register(registerDto);
  }

  login(user: any): Promise<{ accessToken: string }> {
    return this.authRepository.login(user);
  }
}
