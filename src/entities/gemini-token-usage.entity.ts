import { Entity, Column, Index } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { NSGeminiAction } from "@/common/enums/EGemini";

@Entity("gemini_token_usages")
export class GeminiTokenUsage extends BaseEntity {
  @Index()
  @Column({
    type: "enum",
    enum: NSGeminiAction,
    default: NSGeminiAction.GENERATE_TEXT,
  })
  action: NSGeminiAction;

  @Index()
  @Column({ type: "varchar", length: 100 })
  model: string;

  @Column({ type: "int", default: 0 })
  promptTokens: number;

  @Column({ type: "int", default: 0 })
  candidateTokens: number;

  @Column({ type: "int", default: 0 })
  totalTokens: number;

  @Column({ type: "int", default: 0 })
  thoughtTokens: number;

  @Index()
  @Column({ type: "uuid", nullable: true })
  userId?: string;

  @Column({ type: "jsonb", nullable: true })
  metadata?: Record<string, unknown>;
}
