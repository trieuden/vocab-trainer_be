import { PrimaryGeneratedColumn, JoinColumn, OneToOne, Entity, ManyToOne } from 'typeorm';
import { Topic, Word } from 'src/entities';

@Entity('topic_words')
export class TopicWord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Word, (word) => word.topicWords)
  @JoinColumn({ name: 'wordId' })
  word: Word;

  @ManyToOne(() => Topic, (topic) => topic.topicWords)
  @JoinColumn({ name: 'topicId' })
  topic: Topic;
}
