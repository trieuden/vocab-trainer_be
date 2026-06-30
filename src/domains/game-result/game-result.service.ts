import { Injectable, NotFoundException } from "@nestjs/common";
import { GameResultRepo } from "@/repositories/game-result.repo";
import { CreateGameResultDto, FindGameResultDto, UpdateGameResultDto } from "./dtos";
import { Transaction } from "@/core/decorators/transaction.decorator";

@Injectable()
export class GameResultService {
  constructor(private readonly repo: GameResultRepo) {}

  async find(dto: FindGameResultDto) {
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
  async create(dto: CreateGameResultDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  @Transaction()
  async update(id: string, dto: UpdateGameResultDto) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("GameResult not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("GameResult not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
