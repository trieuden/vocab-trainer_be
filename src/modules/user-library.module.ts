import { UserLibraryController } from '@/controllers/user-library/user-library.controller';
import { Library, User, UserLibrary } from '@/entities';
import { UserLibraryRepository } from '@/repositories/user-library.repository';
import { UserLibraryService } from '@/services/user-library/user-library.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserLibrary, User, Library])],
  controllers: [UserLibraryController],
  providers: [UserLibraryService, UserLibraryRepository],
  exports: [UserLibraryService, UserLibraryRepository],
})
export class UserLibraryModule {}
