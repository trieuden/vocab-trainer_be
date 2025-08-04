import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from '../entities/';
import { Gender, UserStatus } from 'libs/shared/enums/user.enum';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    // Kiểm tra xem đã có data chưa
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      return;
    }

    const roles = await this.roleRepository.find();

    // Tạo sample users
    await this.userRepository.save([
      {
        username: 'john_doe',
        password: '123456',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        gender: Gender.MALE,
        status: UserStatus.ACTIVE,
        role: roles.find(role => role.role_name === 'admin'),
      },
    ]);
  }
}
