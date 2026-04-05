import { Entity, Column, OneToMany } from "typeorm";
import { GameType } from "@/common/enums/EGame";
import { BaseEntity, GameResult } from "@/entities";

@Entity("games")
export class Game extends BaseEntity {
  @Column({ type: "enum", enum: GameType })
  type: GameType;

  @Column({ type: "jsonb", nullable: true })
  wordCodes?: string[];

  @Column({ type: "jsonb", nullable: true })
  audioGroupId?: string[];

  @Column({ type: "varchar", length: 500, nullable: true })
  bgImage?: string;

  @OneToMany(() => GameResult, (gr) => gr.game, { lazy: true })
  results?: Promise<GameResult[]>;
}
