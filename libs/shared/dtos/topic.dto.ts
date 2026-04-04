import { ApiProperty } from '@nestjs/swagger';
import { CreateTopicWordDto } from './topic-word.dto';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateTopicDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Topic name',
    required: true,
    example: 'Science',
  })
  topicName: string;

  @IsOptional()
  @ApiProperty({
    description: 'Description of the topic',
    required: false,
    example: 'A topic about various scientific subjects.',
  })
  description?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Ảnh đại diện của topic',
    type: 'string',
    format: 'binary',
    required: false,
  })
  imageURL?: Express.Multer.File

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(id => id.trim()).filter(id => id.length > 0);
    }
    if (Array.isArray(value)) {
      return value;
    }
    return value;
  })
  @ApiProperty({
    description: 'wordIds',
    required: false,
    example: [],
  })
  wordIds?: string[];
}

export class UpdateTopicDto {
  @IsOptional()
  @ApiProperty({
    description: 'Topic name',
    required: false,
    example: ''
  })
  topicName: string;

  @IsOptional()
  @ApiProperty({
    description: 'Description of the topic',
    required: false,
    example: ''
  })  
  description?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Ảnh đại diện của topic',
    type: 'string',
    format: 'binary',
    required: false,
  })
  imageURL?: Express.Multer.File

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    description:'is delete Avatar',
    default: false,
    required:false
  })
  isDeleteAvatar?: boolean
}
