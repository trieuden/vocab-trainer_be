import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from '../entities/';
import { CEFRLevel } from '../../libs/shared/enums/word.enum';

@Injectable()
export class WordSeeder {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async seed() {
    const existingWords = await this.wordRepository.count();
    if (existingWords > 0) {
      return;
    }

    const words: Partial<Word>[] = [
      {
        word: 'hello',
        CEFR_Level: CEFRLevel.A,
        pronunciation_uk: 'həˈləʊ',
        pronunciation_us: 'həˈloʊ',
      },
      {
        word: 'play',
        CEFR_Level: CEFRLevel.A,
        pronunciation_uk: 'pleɪ',
        pronunciation_us: 'pleɪ',
      },
    ];

    await this.wordRepository.save(words);
  }
}
