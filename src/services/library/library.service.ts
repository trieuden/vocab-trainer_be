import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from '@/entities';
import { LibraryRepository } from '@/repositories/library.repository';
import { CreateLibraryDto, UpdateLibraryDto } from '@/shared/dtos/library.dto';

@Injectable()
export class LibraryService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async findAllLibraries(): Promise<Library[]> {
    return this.libraryRepository.findAllLibraries();
  }

  async findLibraryById(id: string): Promise<Library | null> {
    return this.libraryRepository.findById(id);
  }

  async createLibrary(libraryData: Partial<CreateLibraryDto>, user: any): Promise<Library> {
    return this.libraryRepository.createLibrary(libraryData, user);
  }

  async updateLibrary(id: string, libraryData: Partial<UpdateLibraryDto>): Promise<Library> {
    return this.libraryRepository.updateLibrary(id, libraryData);
  }

  async deleteLibrary(id: string): Promise<void> {
    return this.libraryRepository.deleteLibrary(id);
  }
}
