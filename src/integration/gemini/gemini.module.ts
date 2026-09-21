import { Module } from "@nestjs/common";
import { GeminiController } from "./gemini.controller";
import { GeminiService } from "./gemini.service";
import { SystemConfigModule } from "@/domains/system-config/system-config.module";

@Module({
  imports: [SystemConfigModule],
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
