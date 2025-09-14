import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from '@/entities';
import { EntryRepository } from '@/repositories/entry.repository';
import { CreateEntryDto, UpdateEntryDto } from '@/shared/dtos/entry.dto';

@Injectable()
export class EntryService {
  constructor(private readonly entryRepository: EntryRepository) {}

  async findAllEntries(): Promise<Entry[]> {
    return this.entryRepository.findAllEntries();
  }

  async findEntryById(id: string): Promise<Entry | null> {
    return this.entryRepository.findById(id);
  }

  async createEntry(entryData: CreateEntryDto): Promise<Entry> {
    return this.entryRepository.createEntry(entryData);
  }

  async updateEntry(id: string, entryData: UpdateEntryDto): Promise<Entry> {
    return this.entryRepository.updateEntry(id, entryData);
  }
}
