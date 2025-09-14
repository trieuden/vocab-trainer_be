import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { User, ActionType } from 'src/entities';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  action_details: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  action_time: Date;

  @ManyToOne(() => User, (user) => user.auditLogs)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => ActionType, (actionType) => actionType.id)
  @JoinColumn({ name: 'action_type_id' })
  actionType: ActionType;
}
