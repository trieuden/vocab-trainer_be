import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User, Role } from '@/entities';
import { AuthService } from '@/services/auth/auth.service';
import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthRepository } from '@/repositories/auth.repository';
import { RoleModule } from './role.module';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/core/passport/local.strategy';
import { JwtStrategy } from '@/core/passport/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RoleModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: process.env.EXPIRES_IN || '3d' },
    }),
  ],
  providers: [AuthRepository, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthRepository, AuthService],
})
export class AuthModule {}
