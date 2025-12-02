import { TopicWordService } from '@/services/topic-word/topic-word.service';
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TopicWord } from '@/entities';
import { Param } from '@nestjs/common';
import { CreateTopicWordDto } from '@/shared/dtos/topic-word.dto';

@ApiTags('Topic-Words')
@Controller('topic-word')
export class TopicWordController {
  constructor(private readonly topicWordService: TopicWordService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all topic-words',
  })
  findAll(): Promise<TopicWord[] | null> {
    return this.topicWordService.findAllTopicWords();
  }

  @Get('/:topicId/topicId')
  @ApiOperation({
    summary: 'Get topic-words by Topic ID',
  })
  findByTopicId(@Param('topicId') topicId: string): Promise<TopicWord | null> {
    return this.topicWordService.findTopicWordById(topicId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new topic-word',
  })
  createTopicWord(topicWord: CreateTopicWordDto): Promise<TopicWord> {
    return this.topicWordService.createTopicWord(topicWord);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a topic-word by ID',
  })
  deleteTopicWord(@Param('id') id: string): Promise<void> {
    return this.topicWordService.deleteTopicWord(id);
  }
}
