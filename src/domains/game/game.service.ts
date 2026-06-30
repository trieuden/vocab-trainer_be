import { Injectable, NotFoundException } from "@nestjs/common";
import { GameRepo } from "@/repositories/game.repo";
import { CreateGameDto, FindGameDto, UpdateGameDto } from "./dtos";
import { Transaction } from "@/core/decorators/transaction.decorator";

@Injectable()
export class GameService {
  constructor(private readonly repo: GameRepo) {}

  async find(dto: FindGameDto) {
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
  async create(dto: CreateGameDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  @Transaction()
  async update(id: string, dto: UpdateGameDto) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("Game not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException("Game not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
