import { Injectable } from "@nestjs/common";
import { dictionaryAPI } from "@/helpers/dictionary-api.helper";
import type { DefineWordsDto, SuggestWordsDto } from "./dtos";

@Injectable()
export class DictionaryService {
  async defineWords(dto: DefineWordsDto) {
    const data = await dictionaryAPI.getDefinitions(dto.word);
    return data?.[0] ?? null;
  }

  async suggestWords(dto: SuggestWordsDto) {
    const data = await dictionaryAPI.getSuggestions(dto.word, dto.max ?? 10);
    return data;
  }
}