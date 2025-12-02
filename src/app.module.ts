
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LastActiveInterceptor } from './common/interceptors/last-active.interceptor';
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
  CloudinaryModule,
  UserPermissionModule,
} from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionService } from './services/user-permission/user-permission.service';
import { UserPermissionController } from './controllers/user-permission/user-permission.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    AuthModule,
    CloudinaryModule,
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
    UserPermissionModule
  ],
  controllers: [UserPermissionController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LastActiveInterceptor,
  }, UserPermissionService],
})
export class AppModule {}
