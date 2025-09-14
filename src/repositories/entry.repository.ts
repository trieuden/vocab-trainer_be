import { DataSource, Repository } from 'typeorm';
import { Entry } from './../entities/entry.entity';
import { CreateEntryDto, UpdateEntryDto } from '@/shared/dtos/entry.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EntryRepository extends Repository<Entry> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Entry, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Entry | null> {
    return this.findOne({ where: { id } });
  }

  async findByWordId(wordId: string): Promise<Entry[]> {
    return this.find({ where: { word: { id: wordId } } });
  }

  async findAllEntries(): Promise<Entry[]> {
    return this.find();
  }
  async createEntry(entry: CreateEntryDto): Promise<Entry> {
    const newEntry = this.create(entry);
    return this.save(newEntry);
  }
  async updateEntry(id: string, entry: UpdateEntryDto): Promise<Entry> {
    const existingEntry = await this.findById(id);
    if (!existingEntry) {
      throw new Error('Entry not found');
    }
    const updated = this.merge(existingEntry, entry);
    return this.save(updated);
  }
}
