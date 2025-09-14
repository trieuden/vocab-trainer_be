import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entities';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UserRepository, RoleRepository } from '@/repositories';
import { hashPassword } from '@/core/utils/password.utils';
import { Gender } from '@/shared/enums/user.enum';
import { RegisterDto } from '@/shared/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async register(user: RegisterDto): Promise<User> {
    try {
      // Kiểm tra email
      const existingEmail = await this.userRepository.findByEmail(user.email);
      if (existingEmail) {
        throw new BadRequestException('Username or email already exists');
      }
      // Kiểm tra username
      const existingUsername = await this.userRepository.findByUsername(user.username);
      if (existingUsername) {
        throw new BadRequestException('Username or email already exists');
      }
      // Mã hóa mật khẩu
      const password = await hashPassword(user.password);
      user.password = password;

      //Giới tính
      if (user.gender) {
        switch (user.gender) {
          case 'male':
            user.gender = Gender.MALE;
            break;
          case 'female':
            user.gender = Gender.FEMALE;
            break;
          default:
            user.gender = Gender.OTHER;
            break;
        }
      }
      const newUser = this.create(user);

      const role = await this.roleRepository.findByRoleName('user');
      if (role) {
        newUser.role = role;
      }

      return this.save(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async login(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_secret_key',
      expiresIn: process.env.EXPIRES_IN || '3d',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
