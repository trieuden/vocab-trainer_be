import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepo } from "@/repositories/task.repo";
import { CreateTaskDto, FindTaskDto, UpdateTaskDto } from "./dtos";
import { Transaction } from "@/core/decorators/transaction.decorator";

@Injectable()
export class TaskService {
  constructor(private readonly repo: TaskRepo) {}

  async find(dto: FindTaskDto) {
    const { pageSize, pageIndex } = dto;
    const [data, total] = await this.repo.findAndCount({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
      skip: (pageIndex ?? 1) - 1,
      take: pageSize,
    });
    return { data, total };
  }


  @Transaction()
  async create(dto: CreateTaskDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  @Transaction()
  async update(id: string, dto: UpdateTaskDto) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("Task not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("Task not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
