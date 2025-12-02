import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission, Role, RolePermission, User } from '../entities/';


@Injectable()
export class RolePermissionSeeder {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

  ) {}

  async seed() {
    // Kiểm tra xem đã có data chưa
    const count = await this.rolePermissionRepository.count();
    if (count > 0) {
      return;
    }

    const roles = await this.roleRepository.find();
    const permissions = await this.permissionRepository.find()

    // Tạo sample
    await this.rolePermissionRepository.save([
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_USERS')
      },
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_TOPICS')
      },
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_LIBRARIES')
      },
      {
        role: roles.find((role)=> role.role_name === 'user'),
        permission: permissions.find((role)=> role.permission_name === 'USER_S_ACCESS')
      },
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_AUDITLOGS')
      },
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_ROLES')
      },
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_PERMISSIONS')
      },
      {
        role: roles.find((role)=> role.role_name === 'admin'),
        permission: permissions.find((role)=> role.permission_name === 'ADMIN_P_WORDS')
      },
    ]);
  }
}
