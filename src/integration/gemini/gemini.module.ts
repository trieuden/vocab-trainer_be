import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeminiTokenUsage } from "@/entities/gemini-token-usage.entity";
import { GeminiController } from "./gemini.controller";
import { GeminiService } from "./gemini.service";
import { SystemConfigModule } from "@/domains/system-config/system-config.module";

@Module({
  imports: [TypeOrmModule.forFeature([GeminiTokenUsage]), SystemConfigModule],
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
