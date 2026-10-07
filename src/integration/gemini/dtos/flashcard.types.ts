import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GenerateFlashcardDto {
  @ApiProperty({
    description: "Danh sách từ cần tạo định nghĩa flashcard",
    example: ["apple", "elephant", "run"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  words: string[];

  @ApiPropertyOptional({
    description: "Cấp độ ngôn ngữ mục tiêu (A1, A2, B1, B2, C1, C2)",
    example: "A1",
  })
  @IsOptional()
  @IsString()
  level?: string;
}

export interface FlashcardItemResult {
  word: string;
  definition: string;
  phonetic: string;
  phoneticText: string;
  audio: string;
}