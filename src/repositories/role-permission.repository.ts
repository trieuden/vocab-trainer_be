import { Repository } from 'typeorm';
import { Permission, Role, RolePermission } from '@/entities';
import { DataSource } from 'typeorm';
import { CreateRolePermissionDto } from '@/shared/dtos/role-permission.dto';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RolePermissionRepository extends Repository<RolePermission> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) {
    super(RolePermission, dataSource.createEntityManager());
  }

  async findAll(): Promise<RolePermission[]> {
    return this.find();
  }

  async findByRoleId(roleId: string): Promise<RolePermission[]> {
    return this.find({
      where: { role: { id: roleId } },
      relations: ['permission'],
    });
  }

  async findRolePermissionById(id: string): Promise<RolePermission | null> {
    return this.findOne({ where: { id } });
  }

  async createRolePermission(rolePermission: CreateRolePermissionDto): Promise<RolePermission> {
    const newRolePermission = this.create();
    const role = await this.roleRepository.findOne({ where: { id: rolePermission.roleId } });
    if (!role) {
      throw new Error('Role not found');
    }
    const permission = await this.permissionRepository.findOne({ where: { id: rolePermission.permissionId } });
    if (!permission) {
      throw new Error('Permission not found');
    }
    newRolePermission.role = role;
    newRolePermission.permission = permission;
    return this.save(newRolePermission);
  }

  async deleteRolePermission(id: string): Promise<void> {
    const existingRolePermission = await this.findRolePermissionById(id);
    if (!existingRolePermission) {
      throw new Error('RolePermission not found');
    }
    await this.remove(existingRolePermission);
  }
}
