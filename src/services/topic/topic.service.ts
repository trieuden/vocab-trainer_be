import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '@/entities';
import { TopicRepository } from '@/repositories/topic.repository';
import { CreateTopicDto, UpdateTopicDto } from '@/shared/dtos/topic.dto';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async findAllTopics(): Promise<Topic[]> {
    return this.topicRepository.findAllTopics();
  }

  async findTopicById(id: string): Promise<Topic | null> {
    return this.topicRepository.findById(id);
  }

  async createTopic(topic: CreateTopicDto): Promise<Topic> {
    return this.topicRepository.createTopic(topic);
  }

  async updateTopic(id: string, topic: UpdateTopicDto): Promise<Topic> {
    return this.topicRepository.updateTopic(id, topic);
  }

  async deleteTopic(id: string): Promise<void> {
    return this.topicRepository.deleteTopic(id);
  }
}
