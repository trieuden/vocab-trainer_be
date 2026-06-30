import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray, IsEnum, IsOptional, IsString, IsUUID,
  ValidateNested, ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";
import { NSLessonPlan } from "@/common/enums";
import { GameType } from "@/common/enums/EGame";

export class WordDto {
  @ApiProperty()
  @IsString()
  word: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  audio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phonetic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  definition?: string;
}

export class SectionInputDto {
  @ApiPropertyOptional({ type: [WordDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WordDto)
  words?: WordDto[];

  @ApiPropertyOptional({ enum: GameType })
  @IsOptional()
  @IsEnum(GameType)
  gameType?: GameType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taskName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  refId?: string;

  @ApiPropertyOptional({ enum: NSLessonPlan.ELessonPlanType })
  @IsOptional()
  @IsEnum(NSLessonPlan.ELessonPlanType)
  refType?: NSLessonPlan.ELessonPlanType;
}

export class CreateLessonPlanDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: NSLessonPlan.ELessonLevel })
  @IsEnum(NSLessonPlan.ELessonLevel)
  level: NSLessonPlan.ELessonLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  warmUp?: SectionInputDto;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  vocab?: SectionInputDto;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  grammar?: SectionInputDto;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  listening?: SectionInputDto;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  reading?: SectionInputDto;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  writing?: SectionInputDto;

  @ApiPropertyOptional({ type: SectionInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SectionInputDto)
  speaking?: SectionInputDto;
}
