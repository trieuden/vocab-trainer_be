import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GeminiService } from "./gemini.service";
import type { GenerateImageDto, GenerateTextDto, GenerateFlashcardDto } from "./dtos";

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
}

