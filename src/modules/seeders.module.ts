import { Module } from '@nestjs/common';
import { UserSeeder, WordSeeder, EntrySeeder, RoleSeeder } from '../seeders';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry, User, Word, Role } from 'src/entities';
import { SeederService } from '../services/seeder/seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Word, Entry, Role])],
  controllers: [],
  providers: [RoleSeeder, UserSeeder, WordSeeder, EntrySeeder, SeederService],
})
export class SeedersModule {}
