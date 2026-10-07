import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SuggestWordsDto {
  @ApiProperty({ description: "Từ gợi ý", example: "hello" })
  @IsString()
  @IsNotEmpty()
  word: string;

  @ApiPropertyOptional({ description: "Số lượng gợi ý tối đa", example: 10, default: 10 })
  @IsOptional()
  @IsNumber()
  max?: number;
}

