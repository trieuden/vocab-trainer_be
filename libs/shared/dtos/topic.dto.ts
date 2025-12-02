import { ApiProperty } from '@nestjs/swagger';
import { CreateTopicWordDto } from './topic-word.dto';

export class CreateTopicDto {
  @ApiProperty({
    description: 'Topic name',
    required: true,
    example: 'Science',
  })
  topic_name: string;

  @ApiProperty({
    description: 'Description of the topic',
    required: false,
    example: 'A topic about various scientific subjects.',
  })
  description?: string;

  @ApiProperty({
    description: 'Image URL for the topic',
    required: false,
    example: 'http://example.com/image.png',
  })
  image_url?: string;

  @ApiProperty({
    description: 'topic words',
    required: false,
    example: [],
  })
  topicWords?: CreateTopicWordDto[];
}

export class UpdateTopicDto {
  @ApiProperty({
    description: 'Topic name',
    required: true,
    example: 'Science',
  })
  topic_name: string;

  @ApiProperty({
    description: 'Description of the topic',
    required: false,
    example: 'A topic about various scientific subjects.',
  })
  description?: string;

  @ApiProperty({
    description: 'Image URL for the topic',
    required: false,
    example: 'http://example.com/image.png',
  })
  image_url?: string;
}
