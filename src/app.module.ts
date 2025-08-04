import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import {
  User,
  Word,
  Entry,
  UserLibrary,
  Library,
  TopicWord,
  Topic,
  AuditLog,
  ActionType,
  Permission,
  Role,
  RolePermission,
} from './entities';
import {
  EntriesModule,
  WordsModule,
  UsersModule,
  SeedersModule,
} from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [
        User,
        Word,
        Entry,
        UserLibrary,
        Library,
        TopicWord,
        Topic,
        Library,
        AuditLog,
        ActionType,
        Permission,
        Role,
        RolePermission,
      ],
    }),
    UsersModule,
    WordsModule,
    EntriesModule,
    SeedersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
