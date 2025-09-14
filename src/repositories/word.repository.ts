import { DataSource, Repository } from 'typeorm';
import { Entry, TopicWord, Word } from '@/entities';
import { CreateWordDto, UpdateWordDto } from '@/shared/dtos/word.dto';
import { EntryRepository } from './entry.repository';
import { TopicWordRepository } from './topic-word.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WordRepository extends Repository<Word> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    @InjectRepository(TopicWord)
    private readonly topicRepository: Repository<TopicWord>,
  ) {
    super(Word, dataSource.createEntityManager());
  }
  async findById(id: string): Promise<Word | null> {
    return this.findOne({ where: { id } });
  }
  async findAllWords(): Promise<Word[]> {
    return this.find();
  }
  async createWord(word: CreateWordDto): Promise<Word> {
    const newWord = this.create(word);
    return this.save(newWord);
  }
  async updateWord(id: string, word: UpdateWordDto): Promise<Word> {
    const existingWord = await this.findById(id);
    if (!existingWord) {
      throw new Error('Word not found');
    }
    const updated = this.merge(existingWord, word);
    return this.save(updated);
  }
  async deleteWord(id: string): Promise<void> {
    const existingWord = await this.findById(id);
    if (!existingWord) {
      throw new Error('Word not found');
    }
    const relatedEntries = await this.entryRepository.find({ where: { word: { id } } });
    await Promise.all(relatedEntries.map((entry) => this.entryRepository.remove(entry)));

    const relatedTopicWords = await this.topicRepository.find({ where: { word: { id } } });
    await Promise.all(relatedTopicWords.map((tw) => this.topicRepository.remove(tw)));

    await this.remove(existingWord);
  }
}
