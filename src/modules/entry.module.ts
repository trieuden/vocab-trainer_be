import { EntryController } from '@/controllers/entry/entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from '@/entities';
import { EntryService } from '@/services/entry/entry.service';
import { Module } from '@nestjs/common';
import { EntryRepository } from '@/repositories/entry.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntryController],
  providers: [EntryService, EntryRepository],
  exports: [EntryService, EntryRepository],
})
export class EntryModule {}
