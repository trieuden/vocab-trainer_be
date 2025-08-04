import { Injectable } from '@nestjs/common';
import { UserSeeder,WordSeeder, EntrySeeder, RoleSeeder } from '../../seeders';


@Injectable()
export class SeederService {
  constructor(
    private readonly rolesSeeder: RoleSeeder,
    private readonly usersSeeder: UserSeeder,
    private readonly wordsSeeder: WordSeeder,
    private readonly entriesSeeder: EntrySeeder,
  ) {}

  async seedAll() {
    
    try {
      await this.rolesSeeder.seed();
      await this.usersSeeder.seed();
      await this.wordsSeeder.seed();
      await this.entriesSeeder.seed();
      
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    }
  }
}