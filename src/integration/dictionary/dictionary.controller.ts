import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { DefineWordsDto, SuggestWordsDto } from "./dtos";
import { DictionaryService } from "./dictionary.service";

@ApiBearerAuth("JWT-auth")
@ApiTags("Integration - Dictionary API")
@Controller("integration/dictionary")
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post("define-words")
  @ApiOperation({ summary: "Get definitions from Dictionary API" })
  defineWords(@Body() body: DefineWordsDto) {
    return this.dictionaryService.defineWords(body);
  }

  @Post("suggest-words")
  @ApiOperation({ summary: "Suggest similar words from Datamuse" })
  suggestWords(@Body() body: SuggestWordsDto) {
    return this.dictionaryService.suggestWords(body);
  }
}
