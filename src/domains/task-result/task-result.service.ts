import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskResultRepo } from "@/repositories/task-result.repo";
import { CreateTaskResultDto, FindTaskResultDto, UpdateTaskResultDto } from "./dtos";
import { Transaction } from "@/core/decorators/transaction.decorator";

@Injectable()
export class TaskResultService {
  constructor(private readonly repo: TaskResultRepo) {}

  async find(dto: FindTaskResultDto) {
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
  async create(dto: CreateTaskResultDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  @Transaction()
  async update(id: string, dto: UpdateTaskResultDto) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("TaskResult not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("TaskResult not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
