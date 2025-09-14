import { Test, TestingModule } from '@nestjs/testing';
import { TopicWordController } from './topic-word.controller';

describe('TopicWordController', () => {
  let controller: TopicWordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicWordController],
    }).compile();

    controller = module.get<TopicWordController>(TopicWordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
