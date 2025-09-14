import { RolePermissionRepository } from '@/repositories/role-permission.repository';
import { Repository, DataSource } from 'typeorm';
import { Role, RolePermission } from 'src/entities';
import { CreateRoleDto, UpdateRoleDto } from '@/shared/dtos/role.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(RolePermission) private readonly rolePermissionRepository: RolePermissionRepository,
  ) {
    super(Role, dataSource.createEntityManager());
  }

  async findAllRoles(): Promise<Role[]> {
    return this.find();
  }

  async findRoleById(id: string): Promise<Role | null> {
    return this.findOne({ where: { id } });
  }

  async findByRoleName(roleName: string): Promise<Role | null> {
    return this.findOne({ where: { role_name: roleName } });
  }

  async createRole(role: CreateRoleDto): Promise<Role> {
    const newRole = this.create();
    newRole.role_name = role.role_name;
    const savedRole = await this.save(newRole);
    await Promise.all(
      role.rolePermissions.map(async (rp) => {
        await this.rolePermissionRepository.createRolePermission(rp);
      }),
    );
    return savedRole;
  }

  async updateRole(roleId: string, role: UpdateRoleDto): Promise<Role> {
    const existingRole = await this.findRoleById(roleId);
    if (!existingRole) {
      throw new Error('Role not found');
    }

    existingRole.role_name = role.role_name ?? existingRole.role_name;

    if (role.rolePermissions) {
      await Promise.all(
        existingRole.rolePermissions.map(async (rp) => {
          await this.rolePermissionRepository.deleteRolePermission(rp.id);
        }),
      );

      await Promise.all(
        role.rolePermissions.map(async (rp) => {
          await this.rolePermissionRepository.createRolePermission(rp);
        }),
      );
    }

    return this.save(existingRole);
  }
}
