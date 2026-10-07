import { Module } from "@nestjs/common";
import { DictionaryController } from "./dictionary.controller";
import { DictionaryService } from "./dictionary.service";
import { GeminiModule } from "../gemini/gemini.module";

@Module({
  imports: [GeminiModule],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
