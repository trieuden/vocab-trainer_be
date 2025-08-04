import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { WordType } from 'libs/shared/enums/word.enum';
import { Word } from 'src/entities/word.entity';


@Entity('entries')
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({enum: WordType, type: 'enum', nullable: false })
  word_type: WordType;

  @Column({ type: 'varchar', length: 255, nullable: false })
  vietnamese: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  example: string;

  @ManyToOne(() => Word, (word) => word.entries)
  @JoinColumn({ name: 'wordId' })
  word: Word;
}
