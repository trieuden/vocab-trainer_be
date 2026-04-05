import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GameType } from "@/common/enums/EGame";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateGameDto {
  @ApiProperty({ enum: GameType })
  @IsEnum(GameType)
  type: GameType;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  wordCodes?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  audioGroupId?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bgImage?: string;
}
