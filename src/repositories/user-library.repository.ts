import { Library, User, UserLibrary } from '@/entities';
import { CreateUserLibraryDto } from '@/shared/dtos/user-library.dto';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserLibraryRepository extends Repository<UserLibrary> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Library) private readonly libraryRepository: Repository<Library>,
  ) {
    super(UserLibrary, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<UserLibrary | null> {
    return this.findOne({ where: { id } });
  }

  async findAllUserLibraries(): Promise<UserLibrary[]> {
    return this.find();
  }

  async createUserLibrary(userLibrary: CreateUserLibraryDto): Promise<UserLibrary> {
    const newUserLibrary = this.create();
    newUserLibrary.name = userLibrary.name;
    const user = await this.userRepository.findOne({ where: { id: userLibrary.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    newUserLibrary.user = user;

    const library = await this.libraryRepository.findOne({ where: { id: userLibrary.libraryId } });
    if (!library) {
      throw new Error('Library not found');
    }
    newUserLibrary.library = library;
    return this.save(newUserLibrary);
  }

  async deleteUserLibrary(id: string): Promise<void> {
    const existingUserLibrary = await this.findById(id);
    if (!existingUserLibrary) {
      throw new Error('UserLibrary not found');
    }
    await this.remove(existingUserLibrary);
  }

  async findByLibraryId(libraryId: string): Promise<UserLibrary[]> {
    return this.find({ where: { library: { id: libraryId } } });
  }
}
