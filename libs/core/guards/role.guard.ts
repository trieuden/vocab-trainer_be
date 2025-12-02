import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/core/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách roles được yêu cầu từ decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Nếu không có @Roles() decorator, cho phép truy cập
    if (!requiredRoles) {
      return true;
    }

    // Lấy user từ request (đã được set bởi JwtAuthGuard)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Kiểm tra user có tồn tại không
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Kiểm tra user có role không
    if (!user.role) {
      throw new ForbiddenException('User does not have a role');
    }

    // Kiểm tra role của user có trong danh sách roles được yêu cầu không
    const hasRole = requiredRoles.some((role) => user.role.role_name === role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${requiredRoles.join(', ')}. Your role: ${user.role.role_name}`,
      );
    }

    return true;
  }
}