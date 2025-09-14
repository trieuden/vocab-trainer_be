import { Test, TestingModule } from '@nestjs/testing';
import { UserLibraryController } from './user-library.controller';

describe('UserLibraryController', () => {
  let controller: UserLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLibraryController],
    }).compile();

    controller = module.get<UserLibraryController>(UserLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
