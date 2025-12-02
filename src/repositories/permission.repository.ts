import { Repository } from 'typeorm';
import { Permission } from '@/entities';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async findByPermissionName(permissionName: string): Promise<Permission | null> {
    return this.findOne({ where: { permission_name: permissionName } });
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.find();
  }

  async findPermissionById(id: string): Promise<Permission | null> {
    return this.findOne({ where: { id } });
  }


  async findActivePermissionsByUserId(userId: string): Promise<Permission[]> {
    const user = await this.dataSource.getRepository('User').findOne({
      where: { id: userId },
      relations: [
        'role',
        'role.rolePermissions',
        'role.rolePermissions.permission',
        'userPermissions',
        'userPermissions.permission',
      ],
    });

    if (!user) {
      return [];
    }

    const permissions: Permission[] = [];
    const permissionMap = new Map<string, Permission>();

    // Lấy permissions từ role
    if (user.role?.rolePermissions) {
      user.role.rolePermissions.forEach((rolePermission) => {
        if (rolePermission.permission) {
          permissionMap.set(rolePermission.permission.id, rolePermission.permission);
        }
      });
    }

    // Lấy permissions được gán trực tiếp cho user
    if (user.userPermissions) {
      user.userPermissions.forEach((userPermission) => {
        if (userPermission.permission) {
          permissionMap.set(userPermission.permission.id, userPermission.permission);
        }
      });
    }

    // Chuyển Map thành Array
    return Array.from(permissionMap.values());
  }

  
}
