import { Injectable } from '@nestjs/common';
import { Permission } from '@/entities';
import { PermissionRepository } from '@/repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionRepository.findAllPermissions();
  }

  async findPermissionById(id: string): Promise<Permission | null> {
    return this.permissionRepository.findPermissionById(id);
  }

  async findByPermissionName(permissionName: string): Promise<Permission | null> {
    return this.permissionRepository.findByPermissionName(permissionName);
  }
}
