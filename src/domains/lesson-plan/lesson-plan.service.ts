import { Injectable, NotFoundException } from "@nestjs/common";
import { LessonPlan } from "@/entities";
import { LessonPlanRepo } from "@/repositories/lesson-plan.repo";
import { CreateLessonPlanDto } from "./dtos/create-lesson-plan.dto";
import { UpdateLessonPlanDto } from "./dtos/update-lesson-plan.dto";

@Injectable()
export class LessonPlanService {
  constructor(private readonly repo: LessonPlanRepo) {}

  findAll(): Promise<LessonPlan[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<LessonPlan | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async create(dto: CreateLessonPlanDto): Promise<LessonPlan> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async update(id: string, dto: UpdateLessonPlanDto): Promise<LessonPlan> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("LessonPlan not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("LessonPlan not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
