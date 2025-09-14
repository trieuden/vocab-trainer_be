import { Test, TestingModule } from '@nestjs/testing';
import { TopicWordService } from './topic-word.service';

describe('TopicWordService', () => {
  let service: TopicWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicWordService],
    }).compile();

    service = module.get<TopicWordService>(TopicWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
