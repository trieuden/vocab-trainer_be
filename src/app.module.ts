import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LastActiveInterceptor } from './common/interceptors/last-active.interceptor';
import { appFeatureModules } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    ...appFeatureModules,
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LastActiveInterceptor,
  }],
})
export class AppModule {}
