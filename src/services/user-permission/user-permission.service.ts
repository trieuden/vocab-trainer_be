import { Injectable } from '@nestjs/common';
import { UserPermissionRepository } from '@/repositories/user-permission.repository';
import { UserPermission } from '@/entities/user-permission.entity';

@Injectable()
export class UserPermissionService {
  constructor(private readonly userPermissionRepository: UserPermissionRepository) {}

  async findByUserId(roleId: string): Promise<UserPermission[]> {
    return this.userPermissionRepository.findByUserId(roleId);
  }

  async findUserPermissionById(id: string): Promise<UserPermission | null> {
    return this.userPermissionRepository.findById(id);
  }

  async findAll(): Promise<UserPermission[]> {
    return this.userPermissionRepository.findAll();
  }
}
