import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { GameType } from "@/common/enums/EGame";
import { BaseEntity, GameResult, User, Word } from "@/entities";

@Entity("games")
export class Game extends BaseEntity {
  @Column("uuid", { nullable: true })
  parentId?: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentId" })
  user: User;

  @Column({ type: "enum", enum: GameType })
  type: GameType;

  @Column({ type: "varchar", length: 500, nullable: true })
  bgImage?: string;

  @OneToMany(() => GameResult, (gr) => gr.game)
  results?: GameResult[];

  @OneToMany(() => Word, (w) => w.game)
  words?: Word[];
}
