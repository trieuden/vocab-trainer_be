import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicWord } from '@/entities';

@Injectable()
export class TopicWordService {
  constructor(
    @InjectRepository(TopicWord)
    private readonly topicWordRepository: Repository<TopicWord>,
  ) {}
}
