import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentGroup } from "@/entities";
import { StudentGroupRepo } from "@/repositories/student-group.repo";
import { StudentGroupService } from "./student-group.service";
import { StudentGroupController } from "./student-group.controller";

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup])],
  controllers: [StudentGroupController],
  providers: [StudentGroupRepo, StudentGroupService],
  exports: [StudentGroupService],
})
export class StudentGroupModule {}
