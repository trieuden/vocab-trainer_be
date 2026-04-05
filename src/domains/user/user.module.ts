import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/entities";
import { UserRepo } from "@/repositories/user.repo";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepo, UserService],
  exports: [UserService],
})
export class UserModule {}
