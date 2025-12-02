import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '@/core/decorators/permission.decorator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '@/entities';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Lấy permission được yêu cầu từ decorator @Permission()
    const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Nếu không có @Permission() decorator, cho phép truy cập
    if (!requiredPermission) {
      return true;
    }

    // Lấy user từ request (đã được set bởi JwtAuthGuard)
    const request = context.switchToHttp().getRequest();
    let user = request.user;

    // Kiểm tra user có tồn tại không
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Reload user với tất cả relations cần thiết để đảm bảo có đầy đủ dữ liệu
    user = await this.dataSource.getRepository(User).findOne({
      where: { id: user.id },
      relations: [
        'role',
        'role.rolePermissions',
        'role.rolePermissions.permission',
        'userPermissions',
        'userPermissions.permission',
      ],
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Kiểm tra user có role không
    if (!user.role) {
      throw new ForbiddenException('User does not have a role');
    }

    // Kiểm tra permission trong rolePermissions
    const hasRolePermission = user.role?.rolePermissions?.some(
      (rolePermission) => rolePermission.permission?.permission_name === requiredPermission,
    ) || false;

    // Kiểm tra permission trong userPermissions
    const hasUserPermission = user.userPermissions?.some(
      (userPermission) => userPermission.permission?.permission_name === requiredPermission,
    ) || false;

    // Cả hai điều kiện phải đều true (AND)
    if (!hasRolePermission || !hasUserPermission) {
      throw new ForbiddenException(
        `Access denied. Required permission: ${requiredPermission}. ` +
        `Role permission: ${hasRolePermission ? 'granted' : 'denied'}, ` +
        `User permission: ${hasUserPermission ? 'granted' : 'denied'}`,
      );
    }

    return true;
  }
}
