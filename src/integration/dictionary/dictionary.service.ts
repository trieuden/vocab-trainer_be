import { Injectable, Logger } from "@nestjs/common";
import { dictionaryAPI } from "@/helpers/dictionary-api.helper";
import { GeminiService } from "../gemini/gemini.service";
import { DefineWordsDto, SuggestWordsDto } from "./dtos";

@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);

  constructor(private readonly geminiService: GeminiService) {}

  async defineWords(dto: DefineWordsDto) {
    try {
      return await this.geminiService.defineWord(dto.word);
    } catch (error) {
      this.logger.error(
        `Gemini defineWord failed for "${dto.word}": ${
          error instanceof Error ? error.message : error
        }`,
      );
      return null;
    }
  }

  async suggestWords(dto: SuggestWordsDto) {
    const data = await dictionaryAPI.getSuggestions(dto.word, dto.max ?? 10);
    return data;
  }
}