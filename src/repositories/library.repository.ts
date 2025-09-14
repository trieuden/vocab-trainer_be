import { CreateLibraryDto, UpdateLibraryDto } from '@/shared/dtos/library.dto';
import { Library } from './../entities/library.entity';
import { DataSource, Repository } from 'typeorm';
import { User, UserLibrary } from '@/entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LibraryRepository extends Repository<Library> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(UserLibrary) private readonly userLibrary: Repository<UserLibrary>,
  ) {
    super(Library, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Library | null> {
    return this.findOne({ where: { id } });
  }

  async findAllLibraries(): Promise<Library[]> {
    return this.find();
  }

  async createLibrary(library: Partial<CreateLibraryDto>, user: User): Promise<Library> {
    const newLibrary = this.create(library);
    newLibrary.createdBy = user;
    return this.save(newLibrary);
  }
  async updateLibrary(id: string, library: Partial<UpdateLibraryDto>): Promise<Library> {
    const existingLibrary = await this.findById(id);
    if (!existingLibrary) {
      throw new Error('Library not found');
    }
    const updated = this.merge(existingLibrary, library);
    return this.save(updated);
  }

  async deleteLibrary(id: string): Promise<void> {
    const existingLibrary = await this.findById(id);
    if (!existingLibrary) {
      throw new Error('Library not found');
    }

    const relatedUserLibraries = await this.userLibrary.find({ where: { library: { id } } });
    await Promise.all(relatedUserLibraries.map((ul) => this.userLibrary.remove(ul)));
    await this.remove(existingLibrary);
  }
}
