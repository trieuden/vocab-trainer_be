import { UserPermissionController } from '@/controllers/user-permission/user-permission.controller';
import { UserPermission } from '@/entities/user-permission.entity';
import {User, Permission} from '@/entities'
import { UserPermissionRepository } from '@/repositories/user-permission.repository';
import { UserPermissionService } from '@/services/user-permission/user-permission.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserPermission, User, Permission])],
  controllers: [UserPermissionController],
  providers: [UserPermissionService, UserPermissionRepository],
  exports: [UserPermissionService, UserPermissionRepository],
})
export class UserPermissionModule {}
