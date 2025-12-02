import { Repository } from 'typeorm';
import { Permission, Role, RolePermission } from '@/entities';
import { DataSource } from 'typeorm';
import { CreateRolePermissionDto } from '@/shared/dtos/role-permission.dto';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { UserPermission } from '@/entities/user-permission.entity';
import { User } from '@/entities';
import { CreateUserPermissionDto } from '@/shared/dtos/user-permission.dto';

@Injectable()
export class UserPermissionRepository extends Repository<UserPermission> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) {
    super(UserPermission, dataSource.createEntityManager());
  }

  async findAll(): Promise<UserPermission[]> {
    return this.find();
  }

  async findByUserId(userId: string): Promise<UserPermission[]> {
    return this.find({
      where: { user: { id: userId } },
      relations: ['permission'],
    });
  }

  async findById(id: string): Promise<UserPermission | null> {
    return this.findOne({ where: { id } });
  }

  async createUserPermission(userPermission: CreateUserPermissionDto): Promise<UserPermission> {
    const newUserPermission = this.create();
    const user = await this.userRepository.findOne({ where: { id: userPermission.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const permission = await this.permissionRepository.findOne({ where: { id: userPermission.permissionId } });
    if (!permission) {
      throw new Error('Permission not found');
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
