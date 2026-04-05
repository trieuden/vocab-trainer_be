import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "@/entities";
import { TaskRepo } from "@/repositories/task.repo";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@Injectable()
export class TaskService {
  constructor(private readonly repo: TaskRepo) {}

  findAll(): Promise<Task[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<Task | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("Task not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("Task not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
