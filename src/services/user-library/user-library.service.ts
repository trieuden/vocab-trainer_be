import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLibrary } from '@/entities';
import { UserLibraryRepository } from '@/repositories/user-library.repository';

@Injectable()
export class UserLibraryService {
  constructor(private readonly userLibraryRepository: UserLibraryRepository) {}

  async getUserLibraryById(id: string): Promise<UserLibrary | null> {
    return this.userLibraryRepository.findById(id);
  }

  async getAllUserLibraries(): Promise<UserLibrary[]> {
    return this.userLibraryRepository.findAllUserLibraries();
  }

  async createUserLibrary(data: { name: string; userId: string; libraryId: string }): Promise<UserLibrary> {
    return this.userLibraryRepository.createUserLibrary(data);
  }

  async deleteUserLibrary(id: string): Promise<void> {
    return this.userLibraryRepository.deleteUserLibrary(id);
  }
}
