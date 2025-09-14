import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicWordDto {
  @ApiProperty({
    description: 'Word ID',
    required: true,
    example: '1',
  })
  wordId: string;

  @ApiProperty({
    description: 'Topic ID',
    required: true,
    example: '1',
  })
  topicId: string;
}
