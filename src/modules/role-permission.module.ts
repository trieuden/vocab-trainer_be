import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionController } from '@/controllers/role-permission/role-permission.controller';
import { RolePermissionService } from '@/services/role-permission/role-permission.service';
import { Permission, Role, RolePermission } from '@/entities';
import { RolePermissionRepository } from '@/repositories/role-permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Role, Permission])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService, RolePermissionRepository],
  exports: [RolePermissionService, RolePermissionRepository],
})
export class RolePermissionModule {}
