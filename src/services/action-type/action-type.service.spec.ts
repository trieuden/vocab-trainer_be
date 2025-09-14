import { Test, TestingModule } from '@nestjs/testing';
import { ActionTypeService } from './action-type.service';

describe('ActionTypeService', () => {
  let service: ActionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionTypeService],
    }).compile();

    service = module.get<ActionTypeService>(ActionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
