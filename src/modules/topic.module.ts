import { TopicController } from '@/controllers/topic/topic.controller';
import { Topic } from '@/entities';
import { TopicRepository } from '@/repositories/topic.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicWord } from '@/entities/topic-word.entity';
import { WordRepository } from '@/repositories/word.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, TopicWord, TopicWord])],
  controllers: [TopicController],
  providers: [TopicRepository, TopicRepository],
  exports: [TopicRepository, TopicRepository],
})
export class TopicModule {}
