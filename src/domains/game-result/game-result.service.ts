import { Injectable, NotFoundException } from "@nestjs/common";
import { GameResult } from "@/entities";
import { GameResultRepo } from "@/repositories/game-result.repo";
import { CreateGameResultDto } from "./dtos/create-game-result.dto";
import { UpdateGameResultDto } from "./dtos/update-game-result.dto";

@Injectable()
export class GameResultService {
  constructor(private readonly repo: GameResultRepo) {}

  findAll(): Promise<GameResult[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<GameResult | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async create(dto: CreateGameResultDto): Promise<GameResult> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async update(id: string, dto: UpdateGameResultDto): Promise<GameResult> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("GameResult not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("GameResult not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
