import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "@/entities";
import { TaskRepo } from "@/repositories/task.repo";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskRepo, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
