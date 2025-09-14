import { Module } from '@nestjs/common';
import {
  WordModule,
  UserModule,
  SeedersModule,
  ActionTypeModule,
  AuditLogModule,
  EntryModule,
  LibraryModule,
  PermissionModule,
  RolePermissionModule,
  RoleModule,
  TopicWordModule,
  TopicModule,
  UserLibraryModule,
  AuthModule,
} from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'vocab_trainer',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'vocab_trainer',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    ActionTypeModule,
    AuditLogModule,
    EntryModule,
    LibraryModule,
    PermissionModule,
    RolePermissionModule,
    RoleModule,
    SeedersModule,
    TopicWordModule,
    TopicModule,
    UserLibraryModule,
    UserModule,
    WordModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
