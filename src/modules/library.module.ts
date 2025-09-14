import { LibraryController } from '@/controllers/library/library.controller';
import { Library, UserLibrary } from '@/entities';
import { LibraryRepository } from '@/repositories/library.repository';
import { LibraryService } from '@/services/library/library.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Library, UserLibrary])],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository],
  exports: [LibraryService, LibraryRepository],
})
export class LibraryModule {}
