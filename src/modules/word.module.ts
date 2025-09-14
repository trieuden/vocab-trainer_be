import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry, Topic, TopicWord, Word } from 'src/entities';
import { WordService } from '../services/word/word.service';
import { WordController } from '../controllers/words/words.controller';
import { WordRepository } from '@/repositories/word.repository';
import { EntryRepository } from '@/repositories/entry.repository';
import { TopicRepository } from '@/repositories/topic.repository';
import { TopicWordRepository } from '@/repositories/topic-word.repository';
import { EntryModule } from './entry.module';
import { TopicWordModule } from './topic-word.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Word, Entry, TopicWord])],
  controllers: [WordController],
  providers: [WordService, WordRepository],
  exports: [WordService, WordRepository],
})
export class WordModule {}
