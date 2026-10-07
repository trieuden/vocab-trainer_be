import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DefineWordsDto {
  @ApiProperty({ description: "Từ cần tra cứu định nghĩa", example: "ephemeral" })
  @IsString()
  @IsNotEmpty()
  word: string;
}


