import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskResult } from "@/entities";
import { TaskResultRepo } from "@/repositories/task-result.repo";
import { TaskResultService } from "./task-result.service";
import { TaskResultController } from "./task-result.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TaskResult])],
  controllers: [TaskResultController],
  providers: [TaskResultRepo, TaskResultService],
  exports: [TaskResultService],
})
export class TaskResultModule {}
