import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'vocab_trainer',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'vocab_trainer',
  entities: [__dirname + '/../../**/*.entity.{js,ts}'], // Sửa path này
  synchronize: true,
  logging: true, // Thêm logging để debug
};