import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { LessonLevel, LessonPlanType } from "@/common/enums/ELessonPlan";

export class CreateLessonPlanDto {
  @ApiProperty({ enum: LessonLevel })
  @IsEnum(LessonLevel)
  level: LessonLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  warmUpId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  warmType?: LessonPlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  vocabId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  vocabType?: LessonPlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  grammarId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  grammarType?: LessonPlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  listeningId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  listeningType?: LessonPlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readingId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  readingType?: LessonPlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  writingId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  writingType?: LessonPlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  speakingId?: string;

  @ApiPropertyOptional({ enum: LessonPlanType })
  @IsOptional()
  @IsEnum(LessonPlanType)
  speakingType?: LessonPlanType;
}
