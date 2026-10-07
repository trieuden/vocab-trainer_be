import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GeminiService } from "./gemini.service";
import { GenerateFlashcardDto, GetTokenUsageDto } from "./dtos";
import type { GenerateImageDto, GenerateTextDto, GenerateWrongAnswersDto } from "./dtos";

@ApiBearerAuth("JWT-auth")
@ApiTags("Integration - Gemini")
@Controller("integration/gemini")
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post("generate-text")
  @ApiOperation({ summary: "Generate text from Gemini" })
  generateText(@Body() body: GenerateTextDto) {
    return this.geminiService.generateText(body.prompt, body.images ?? []);
  }

  @Post("generate-image")
  @ApiOperation({ summary: "Generate image from Gemini" })
  generateImage(@Body() body: GenerateImageDto) {
    return this.geminiService.generateImage(body.prompt);
  }

  @Post("generate-flashcard")
  @ApiOperation({ summary: "Generate flashcard from Gemini" })
  generateFlashcard(@Body() body: GenerateFlashcardDto) {
    return this.geminiService.generateFlashcard(body);
  }

  @Post("generate-wrong-answers")
  @ApiOperation({ summary: "Generate 3 wrong answers for multiple choice" })
  generateWrongAnswers(@Body() body: GenerateWrongAnswersDto) {
    return this.geminiService.generateWrongAnswers(body);
  }

  @Post("token-usage")
  @ApiOperation({ summary: "Get Gemini token usage statistics and quota reset countdown" })
  tokenUsage(@Body() body: GetTokenUsageDto) {
    return this.geminiService.getTokenUsage(body);
  }
}

