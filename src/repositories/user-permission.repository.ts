import { Repository } from 'typeorm';
import { Permission, Role, RolePermission } from '@/entities';
import { DataSource } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserPermission } from '@/entities/user-permission.entity';
import { User } from '@/entities';
import { CreateUserPermissionDto } from '@/shared/dtos/user-permission.dto';

@Injectable()
export class UserPermissionRepository extends Repository<UserPermission> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(UserPermission, dataSource.createEntityManager());
  }

  async findAll(): Promise<UserPermission[]> {
    return this.find({ relations: ['user', 'permission'] });
  }

  async findByUserId(userId: string): Promise<UserPermission[]> {
    return this.find({
      where: { user: { id: userId } },
      relations: ['permission'],
    });
  }

  async findById(id: string): Promise<UserPermission | null> {
    return this.findOne({ where: { id }, relations: ['user', 'permission'] });
  }

  async createUserPermission(userPermission: CreateUserPermissionDto): Promise<UserPermission> {
    const newUserPermission = this.create();
    const user = await this.userRepository.findOne({ where: { id: userPermission.userId }, relations: ['role'] });
    if (!user) {
      throw new Error('User not found');
    }
    const permission = await this.permissionRepository.findOne({ where: { id: userPermission.permissionId } });
    if (!permission) {
      throw new Error('Permission not found');
    }
    const role = await this.roleRepository.findOne({ where: { id: user.role.id }, relations: ['rolePermissions.permission'] });
    if (!role) {
      throw new Error('Role not found');
    }

    if(!role.rolePermissions.some(rp => rp.permission.id === userPermission.permissionId)) {
      throw new Error('Permission not found in role');
    }

    newUserPermission.user = user;
    newUserPermission.permission = permission;
    return this.save(newUserPermission);
  }

  async deleteUserPermission(id: string): Promise<void> {
    const existingUserPermission = await this.findById(id);
    if (!existingUserPermission) {
      throw new Error('UserPermission not found');
    }
    await this.remove(existingUserPermission);
  }
}
