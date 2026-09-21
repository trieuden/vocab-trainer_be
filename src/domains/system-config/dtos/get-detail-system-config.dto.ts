import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetDetailSystemConfigDto {
  @ApiProperty({ description: "Mã cấu hình (code)", example: "GEMINI_MODEL" })
  @IsString()
  @IsNotEmpty()
  code: string;
}
