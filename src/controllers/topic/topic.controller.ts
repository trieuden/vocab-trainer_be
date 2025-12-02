import { Topic } from '@/entities';
import { TopicService } from '@/services/topic/topic.service';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Param } from '@nestjs/common';

@ApiTags('Topics')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all topics',
  })
  findAll(): Promise<Topic[]> {
    return this.topicService.findAllTopics();
  }

  @Get('/:id/id')
  @ApiOperation({
    summary: 'Get topic by ID',
  })
  findById(@Param('id') id: string): Promise<Topic | null> {
    return this.topicService.findTopicById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new topic',
  })
  createTopic(topic: any): Promise<Topic> {
    return this.topicService.createTopic(topic);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update topic by ID',
  })
  updateTopic(@Param('id') id: string, topic: any): Promise<Topic> {
    return this.topicService.updateTopic(id, topic);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a topic by ID',
  })
  deleteTopic(@Param('id') id: string): Promise<void> {
    return this.topicService.deleteTopic(id);
  }
}
