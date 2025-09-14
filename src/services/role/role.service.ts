import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/repositories';
import { Role } from '@/entities';
import { CreateRoleDto } from '@/shared/dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAllRoles();
  }

  async findRoleById(id: string): Promise<Role | null> {
    return this.roleRepository.findRoleById(id);
  }

  async findByRoleName(roleName: string): Promise<Role | null> {
    return this.roleRepository.findByRoleName(roleName);
  }

  async createRole(role: CreateRoleDto): Promise<Role> {
    return this.roleRepository.createRole(role);
  }
}
