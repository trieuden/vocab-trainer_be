import { Test, TestingModule } from '@nestjs/testing';
import { UserLibraryService } from './user-library.service';

describe('UserLibraryService', () => {
  let service: UserLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLibraryService],
    }).compile();

    service = module.get<UserLibraryService>(UserLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
