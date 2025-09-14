import { Entry, Topic, TopicWord, Word } from '@/entities';
import { TopicWordService } from '@/services/topic-word/topic-word.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicWordController } from '@/controllers/topic-word/topic-word.controller';
import { TopicWordRepository } from '@/repositories/topic-word.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TopicWord, Word, Topic])],
  controllers: [TopicWordController],
  providers: [TopicWordService, TopicWordRepository],
  exports: [TopicWordService, TopicWordRepository],
})
export class TopicWordModule {}
