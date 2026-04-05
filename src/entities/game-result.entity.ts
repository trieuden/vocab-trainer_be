import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, Game, User } from "@/entities";

@Entity("game_results")
export class GameResult extends BaseEntity {
  @Column("uuid")
  gameId: string;

  @ManyToOne(() => Game, (g) => g.results, { onDelete: "CASCADE", lazy: true })
  @JoinColumn({ name: "gameId" })
  game: Promise<Game>;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (u) => u.gameResults, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @Column({ type: "float" })
  score: number;

  @Column({ name: "grade_scale", type: "float" })
  gradeScale: number;

  @Column({ type: "int" })
  version: number;
}
