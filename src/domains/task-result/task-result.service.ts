import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskResult } from "@/entities";
import { TaskResultRepo } from "@/repositories/task-result.repo";
import { CreateTaskResultDto } from "./dtos/create-task-result.dto";
import { UpdateTaskResultDto } from "./dtos/update-task-result.dto";

@Injectable()
export class TaskResultService {
  constructor(private readonly repo: TaskResultRepo) {}

  findAll(): Promise<TaskResult[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<TaskResult | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async create(dto: CreateTaskResultDto): Promise<TaskResult> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async update(id: string, dto: UpdateTaskResultDto): Promise<TaskResult> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("TaskResult not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("TaskResult not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
