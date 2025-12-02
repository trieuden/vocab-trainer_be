import { UserPermissionSeeder } from './../../seeders/user-permission.seeder';
import { Injectable } from '@nestjs/common';
import { UserSeeder, WordSeeder, EntrySeeder, RoleSeeder } from '../../seeders';
import { PermissionSeeder } from '@/seeders/permissions.seeder';
import { RolePermissionSeeder } from '@/seeders/role-permissions.seeder'

@Injectable()
export class SeederService {
  constructor(
    private readonly rolesSeeder: RoleSeeder,
    private readonly permissionsSeeder: PermissionSeeder,
    private readonly usersSeeder: UserSeeder,
    private readonly rolePermissionSeeder: RolePermissionSeeder,
    private readonly userPermissionSeeder: UserPermissionSeeder,
    private readonly wordsSeeder: WordSeeder,
    private readonly entriesSeeder: EntrySeeder,
  ) {}

  async seedAll() {
    try {
      await this.rolesSeeder.seed();
      await this.permissionsSeeder.seed();
      await this.usersSeeder.seed();
      await this.rolePermissionSeeder.seed();
      await this.userPermissionSeeder.seed()
      await this.wordsSeeder.seed();
      await this.entriesSeeder.seed();
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    }
  }
}
