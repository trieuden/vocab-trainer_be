import { TopicStatus } from 'libs/shared/enums/topic.enum';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TopicWord } from './topic-word.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  topicName: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl?: string;

  @Column({ enum: TopicStatus, type: 'enum', default: TopicStatus.ACTIVE })
  status: TopicStatus;

  @OneToMany(() => TopicWord, (topicWord) => topicWord.topic)
  topicWords: TopicWord[];
}
