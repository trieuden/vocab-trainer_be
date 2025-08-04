import { TopicWord } from './topic-word.entity';
import { IsEnum } from 'class-validator';
import { CEFRLevel } from 'libs/shared/enums/word.enum';
import { Entry } from 'src/entities/entry.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  word: string;

  @Column({enum: CEFRLevel, type: 'enum', nullable: false})
  CEFR_Level: CEFRLevel;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pronunciation_uk: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pronunciation_us: string;

  @OneToMany(() => Entry, (entry) => entry.word)
  entries?: Entry[];

  @OneToMany(() => TopicWord, (topicWord) => topicWord.word)
  topicWords?: TopicWord[];
}
