import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicWord } from '@/entities';
import { TopicRepository } from '@/repositories/topic.repository';
import { TopicWordRepository } from '@/repositories/topic-word.repository';
import { CreateTopicWordDto } from '@/shared/dtos/topic-word.dto';

@Injectable()
export class TopicWordService {
  constructor(private readonly topicWordRepository: TopicWordRepository) {}

  async findAllTopicWords(): Promise<TopicWord[] | null> {
    return this.topicWordRepository.findAllTopicWords();
  }

  async findTopicWordById(id: string): Promise<TopicWord | null> {
    return this.topicWordRepository.findById(id);
  }

  async createTopicWord(topicWord: CreateTopicWordDto): Promise<TopicWord> {
    return this.topicWordRepository.createTopicWord(topicWord);
  }

  async deleteTopicWord(id: string): Promise<void> {
    return this.topicWordRepository.deleteTopicWord(id);
  }
}
