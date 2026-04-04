import { Injectable } from '@nestjs/common';
import { RolePermission } from '@/entities';
import { RolePermissionRepository } from '@/repositories/role-permission.repository';
import { CreateRolePermissionDto } from '@/shared/dtos/role-permission.dto';

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

  async createRolePermission(rolePermission: CreateRolePermissionDto): Promise<RolePermission> {
    return this.rolePermissionRepository.createRolePermission(rolePermission)
  }
  async deleteRolePermission(id: string): Promise<void>  {
    return this.rolePermissionRepository.deleteRolePermission(id);
  }
}
