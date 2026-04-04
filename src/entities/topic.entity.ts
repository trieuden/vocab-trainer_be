import { TopicStatus } from 'libs/shared/enums/topic.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
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
  imageURL?: string;

  @Column({ enum: TopicStatus, type: 'enum', default: TopicStatus.ACTIVE })
  status: TopicStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => TopicWord, (topicWord) => topicWord.topic)
  topicWords: TopicWord[];
}
