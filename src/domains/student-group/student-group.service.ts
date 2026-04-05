import { Injectable, NotFoundException } from "@nestjs/common";
import { StudentGroup } from "@/entities";
import { StudentGroupRepo } from "@/repositories/student-group.repo";
import { CreateStudentGroupDto } from "./dtos/create-student-group.dto";
import { UpdateStudentGroupDto } from "./dtos/update-student-group.dto";

@Injectable()
export class StudentGroupService {
  constructor(private readonly repo: StudentGroupRepo) {}

  findAll(): Promise<StudentGroup[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<StudentGroup | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async create(dto: CreateStudentGroupDto): Promise<StudentGroup> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async update(id: string, dto: UpdateStudentGroupDto): Promise<StudentGroup> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("StudentGroup not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("StudentGroup not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
