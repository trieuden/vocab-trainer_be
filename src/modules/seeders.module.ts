import { Module } from '@nestjs/common';
import { UserSeeder, WordSeeder, EntrySeeder, RoleSeeder } from '../seeders';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry, User, Word, Role, Permission, RolePermission } from 'src/entities';
import { SeederService } from '../services/seeder/seeder.service';
import { PermissionSeeder } from '@/seeders/permissions.seeder';
import { RolePermissionSeeder } from '@/seeders/role-permissions.seeder';
import { UserPermission } from '@/entities/user-permission.entity';
import { UserPermissionSeeder } from '@/seeders/user-permission.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([User, Word, Entry, Role, Permission, RolePermission, UserPermission])],
  controllers: [],
  providers: [RoleSeeder, UserSeeder, WordSeeder, EntrySeeder, PermissionSeeder,RolePermissionSeeder,UserPermissionSeeder,SeederService],
})
export class SeedersModule {}
