import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CEFRLevel } from 'libs/shared/enums/word.enum';
import { Column, OneToMany } from 'typeorm';
import { Entry } from 'src/entities/entry.entity';

export class CreateWordDto {
  @ApiProperty({
    required: true,
    example: 'Road',
  })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  word: string;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Level CEFR của từ vựng',
    example: 'B1',
    required: true,
  })
  @IsEnum(CEFRLevel)
  CEFR_Level: CEFRLevel;

  @ApiProperty({
    description: 'Phiên âm Anh Anh của từ vựng',
    example: 'rəʊd',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  pronunciation_uk: string;

  @ApiProperty({
    description: 'Phiên âm Anh Mỹ của từ vựng',
    example: 'roʊd',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  pronunciation_us: string;
}

export class UpdateWordDto {
  @ApiProperty({
    required: true,
    example: 'Road',
  })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  word: string;
}
