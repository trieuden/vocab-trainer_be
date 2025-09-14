import { Injectable } from '@nestjs/common';
import { RolePermission } from '@/entities';
import { RolePermissionRepository } from '@/repositories/role-permission.repository';

@Injectable()
export class RolePermissionService {
  constructor(private readonly rolePermissionRepository: RolePermissionRepository) {}

  async findByRoleId(roleId: string): Promise<RolePermission[]> {
    return this.rolePermissionRepository.findByRoleId(roleId);
  }

  async findById(id: string): Promise<RolePermission | null> {
    return this.rolePermissionRepository.findRolePermissionById(id);
  }

  async findAll(): Promise<RolePermission[]> {
    return this.rolePermissionRepository.findAll();
  }
}
