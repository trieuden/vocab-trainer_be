import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly userRepository: Repository<Word>,
  ) {}

  findAll(): Promise<Word[]> {
    try {
      return this.userRepository.find({
        relations: ['entries'],
      });
    } catch (error) {
      throw error;
    }
  }
}
