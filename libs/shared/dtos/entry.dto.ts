import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Column } from 'typeorm';
import { WordType } from 'libs/shared/enums/word.enum';

export class CreateEntryDto {
  @ApiProperty({
    description: 'word id',
    required: true,
  })
  @Column({ type: 'uuid', nullable: false })
  word_id: string;

  @ApiProperty({
    description: 'word type',
    required: true,
    enum: WordType,
  })
  @IsEnum(WordType)
  word_type: WordType;

  @ApiProperty({
    description: 'Câu ví dụ sử dụng từ vựng',
    required: true,
    example: 'The road was long and winding.',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  example: string;
}
