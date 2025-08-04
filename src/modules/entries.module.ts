import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryController } from 'src/controllers/entries/entries.controller';
import { Entry } from 'src/entities';
import { EntryService } from 'src/services/entry/entries.service';

@Module({
    imports: [TypeOrmModule.forFeature([Entry])],
    controllers: [EntryController],
    providers: [EntryService],
    exports: [EntryService],
})
export class EntriesModule {}