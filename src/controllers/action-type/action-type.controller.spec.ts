import { Test, TestingModule } from '@nestjs/testing';
import { ActionTypeController } from './action-type.controller';

describe('ActionTypeController', () => {
  let controller: ActionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionTypeController],
    }).compile();

    controller = module.get<ActionTypeController>(ActionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
