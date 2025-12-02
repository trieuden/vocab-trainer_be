import { RoleController } from '@/controllers/role/role.controller';
import { Role, RolePermission } from '@/entities';
import { RoleRepository } from '@/repositories/role.repository';
import { RoleService } from '@/services/role/role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionModule } from './role-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission]), RolePermissionModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
