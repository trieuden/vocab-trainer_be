import { TopicWordRepository } from './topic-word.repository';
import { DataSource, Repository } from 'typeorm';
import { Topic, TopicWord } from '@/entities';
import { CreateTopic, UpdateTopic } from '@/shared/dtos/topic.dto';
import { TopicStatus } from '@/shared/enums/topic.enum';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class TopicRepository extends Repository<Topic> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(TopicWord) private readonly topicWordRepository: Repository<TopicWord>,
  ) {
    super(Topic, dataSource.createEntityManager());
  }
  async findById(id: string): Promise<Topic | null> {
    return this.findOne({ where: { id } });
  }
  async findAllTopics(): Promise<Topic[]> {
    return this.find();
  }
  async createTopic(topic: CreateTopic): Promise<Topic> {
    const newTopic = this.create();
    newTopic.topicName = topic.topic_name;
    newTopic.description = topic.description;
    newTopic.imageUrl = topic.image_url;
    newTopic.status = TopicStatus.ACTIVE;

    if (topic.topicWords && topic.topicWords.length > 0) {
      await Promise.all(
        topic.topicWords.map(async (tw) => {
          // await this.topicWordRepository.createTopicWord(tw);
        }),
      );
    }
    return this.save(newTopic);
  }

  async updateTopic(id: string, topic: UpdateTopic): Promise<Topic> {
    const existingTopic = await this.findById(id);
    if (!existingTopic) {
      throw new Error('Topic not found');
    }
    if (topic.topic_name !== undefined) {
      existingTopic.topicName = topic.topic_name;
    }
    if (topic.description !== undefined) {
      existingTopic.description = topic.description;
    }
    if (topic.image_url !== undefined) {
      existingTopic.imageUrl = topic.image_url;
    }
    return this.save(existingTopic);
  }

  async deleteTopic(id: string): Promise<void> {
    const existingTopic = await this.findById(id);
    if (!existingTopic) {
      throw new Error('Topic not found');
    }
    // const relatedTopicWords = await this.topicWordRepository.findByTopicId(id);
    // await Promise.all(relatedTopicWords.map((tw) => this.topicWordRepository.remove(tw)));
    await this.remove(existingTopic);
  }
}
