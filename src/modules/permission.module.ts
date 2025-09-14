import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from '@/controllers/permission/permission.controller';
import { PermissionService } from '@/services/permission/permission.service';
import { Permission } from '@/entities';
import { PermissionRepository } from '@/repositories/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
