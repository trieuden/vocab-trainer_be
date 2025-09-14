import { Topic, TopicWord, Word } from '@/entities';
import { CreateTopicWordDto } from '@/shared/dtos/topic-word.dto';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { WordRepository } from './word.repository';
import { TopicRepository } from './topic.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class TopicWordRepository extends Repository<TopicWord> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
    @InjectRepository(Topic) private readonly topicRepository: Repository<Topic>,
  ) {
    super(TopicWord, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<TopicWord | null> {
    return this.findOne({ where: { id } });
  }

  async findAllTopicWords(): Promise<TopicWord[]> {
    return this.find();
  }

  async createTopicWord(topicWord: CreateTopicWordDto): Promise<TopicWord> {
    const newTopicWord = this.create();
    const word = await this.wordRepository.findOne({ where: { id: topicWord.wordId } });
    if (!word) {
      throw new Error('Word not found');
    }
    newTopicWord.word = word;
    const topic = await this.topicRepository.findOne({ where: { id: topicWord.topicId } });
    if (!topic) {
      throw new Error('Topic not found');
    }
    newTopicWord.topic = topic;

    return this.save(newTopicWord);
  }

  async deleteTopicWord(id: string): Promise<void> {
    const existingTopicWord = await this.findById(id);
    if (!existingTopicWord) {
      throw new Error('TopicWord not found');
    }
    await this.remove(existingTopicWord);
  }

  async findByWordId(wordId: string): Promise<TopicWord[]> {
    return this.find({ where: { word: { id: wordId } } });
  }

  async findByTopicId(topicId: string): Promise<TopicWord[]> {
    return this.find({ where: { topic: { id: topicId } } });
  }
}
