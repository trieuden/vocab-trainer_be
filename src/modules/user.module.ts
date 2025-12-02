import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user/users.service';
import { UserController } from '../controllers/users/users.controller';
import { User } from '../entities/user.entity';
import { UserRepository } from '@/repositories/user.repository';
import { Role } from '@/entities';
import { RoleModule } from './role.module';
import { CloudinaryModule } from './cloudinary.module';
import { UserPermissionModule } from './user-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), RoleModule, UserPermissionModule,CloudinaryModule],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository, UserService],
})
export class UserModule {}
