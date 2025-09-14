import { Injectable } from '@nestjs/common';
import { WordRepository } from '@/repositories/word.repository';
import { Word } from '@/entities';
import { CreateWordDto, UpdateWordDto } from '@/shared/dtos/word.dto';
@Injectable()
export class WordService {
  constructor(private readonly wordRepository: WordRepository) {}

  async findAllWords(): Promise<Word[]> {
    return this.wordRepository.findAllWords();
  }

  async findWordById(id: string): Promise<Word | null> {
    return this.wordRepository.findById(id);
  }
  async createWord(word: CreateWordDto): Promise<Word> {
    return this.wordRepository.createWord(word);
  }
  async updateWord(id: string, word: UpdateWordDto): Promise<Word> {
    return this.wordRepository.updateWord(id, word);
  }
  async deleteWord(id: string): Promise<void> {
    return this.wordRepository.deleteWord(id);
  }
}
