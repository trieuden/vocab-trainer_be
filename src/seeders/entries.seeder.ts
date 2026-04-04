import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry, Word } from '../entities/';
import { WordType } from 'libs/shared/enums/word.enum';

@Injectable()
export class EntrySeeder {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async seed() {
    const existingEntries = await this.entryRepository.count();
    if (existingEntries > 0) {
      return;
    }

    const words = await this.wordRepository.find();

    const entries: Partial<Entry>[] = [
      {
        wordType: WordType.NOUN,
        vietnamese: 'Xin chào',
        example: 'Hello, how are you?',
        word: words.find((word) => word.english === 'hello'),
      },
      {
        wordType: WordType.NOUN,
        vietnamese: 'Lượt chơi / sự chơi',
        example: 'He says hello to everyone.',
        word: words.find((word) => word.english === 'play'),
      },
      {
        wordType: WordType.VERB,
        vietnamese: 'Chơi',
        example: 'They play football every weekend.',
        word: words.find((word) => word.english === 'play'),
      },
    ];

    await this.entryRepository.save(entries);
  }
}
