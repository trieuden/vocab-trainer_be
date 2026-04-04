import { TopicController } from '@/controllers/topic/topic.controller';
import { Topic } from '@/entities';
import { TopicRepository } from '@/repositories/topic.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicWord } from '@/entities/topic-word.entity';
import { TopicService } from '@/services/topic/topic.service';
import { CloudinaryModule } from './cloudinary.module';
import { TopicWordModule } from './topic-word.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, TopicWord]), CloudinaryModule, TopicWordModule],
  controllers: [TopicController],
  providers: [TopicService, TopicRepository],
  exports: [TopicService, TopicRepository],
})
export class TopicModule {}
