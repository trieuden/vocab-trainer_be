import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSystemConfigDto {
  @ApiProperty({ description: "Mã cấu hình (code)", example: "GEMINI_MODEL" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: "Giá trị mới của cấu hình", example: "gemini-3.6-flash" })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({ description: "Mô tả cấu hình", example: "Active Gemini Model ID" })
  @IsOptional()
  @IsString()
  description?: string;
}
