import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicWordDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Word ID',
    required: true,
    example: '1',
  })
  wordId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Topic ID',
    required: true,
    example: '1',
  })
  topicId: string;
}
