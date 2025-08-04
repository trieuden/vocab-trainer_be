import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    // Kiểm tra xem đã có data chưa
    const userCount = await this.roleRepository.count();
    if (userCount > 0) {
      return;
    }

    // Tạo sample users
    await this.roleRepository.save([
      {
        role_name: 'admin',
      },
      {
        role_name: 'user',
      },
    ]);
  }
}
