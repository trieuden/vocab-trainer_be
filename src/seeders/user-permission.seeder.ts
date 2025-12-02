import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission, Role, RolePermission, User } from '../entities/';
import { UserPermission } from '@/entities/user-permission.entity';


@Injectable()
export class UserPermissionSeeder {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

  ) {}

  async seed() {
    // Kiểm tra xem đã có data chưa
    const count = await this.userPermissionRepository.count();
    if (count > 0) {
      return;
    }

    const users = await this.userRepository.find();
    const permissions = await this.permissionRepository.find()

    // Tạo sample
    await this.userPermissionRepository.save([
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_USERS')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_TOPICS')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_LIBRARIES')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'USER_S_ACCESS')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_AUDITLOGS')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_ROLES')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_PERMISSIONS')
      },
      {
        user: users.find((user)=> user.username === 'john_doe'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_WORDS')
      },
    ]);
  }
}
