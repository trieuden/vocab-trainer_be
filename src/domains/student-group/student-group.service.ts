import { Injectable, NotFoundException } from "@nestjs/common";
import { StudentGroupRepo } from "@/repositories/student-group.repo";
import {
  CreateStudentGroupDto,
  FindStudentGroupDto,
  UpdateStudentGroupDto,
} from "./dtos";
import { Transaction } from "@/core/decorators/transaction.decorator";

@Injectable()
export class StudentGroupService {
  constructor(private readonly repo: StudentGroupRepo) {}

  async find(dto: FindStudentGroupDto) {
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
  async create(dto: CreateStudentGroupDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  @Transaction()
  async update(id: string, dto: UpdateStudentGroupDto) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("StudentGroup not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("StudentGroup not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
