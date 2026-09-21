import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional } from "class-validator";
import { NSSystemConfig } from "@/common/enums";

export class FindSystemConfigDto {
  @ApiPropertyOptional({
    description: "Danh sách mã cấu hình cần lọc",
    enum: NSSystemConfig,
    isArray: true,
    example: [NSSystemConfig.GEMINI_MODEL, NSSystemConfig.GEMINI_API_KEY],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(NSSystemConfig, { each: true })
  codes?: NSSystemConfig[];
}
