import { Injectable, NotFoundException } from "@nestjs/common";
import { Game } from "@/entities";
import { GameRepo } from "@/repositories/game.repo";
import { CreateGameDto } from "./dtos/create-game.dto";
import { UpdateGameDto } from "./dtos/update-game.dto";

@Injectable()
export class GameService {
  constructor(private readonly repo: GameRepo) {}

  findAll(): Promise<Game[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<Game | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async create(dto: CreateGameDto): Promise<Game> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("Game not found");
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException("Game not found");
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
