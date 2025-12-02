import { Gender, UserStatus } from 'libs/shared/enums/user.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Role, AuditLog } from 'src/entities';
import { UserLibrary } from './user-library.entity';
import { Exclude } from 'class-transformer';
import { UserPermission } from './user-permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @Column({ enum: Gender, type: 'enum', nullable: true, default: Gender.OTHER })
  gender?: Gender;

  @Column({ type: 'timestamp' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 100})
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ enum: UserStatus, type: 'enum', default: UserStatus.ACTIVE })
  status?: UserStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  lastActiveAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => AuditLog, (auditLog) => auditLog.user)
  auditLogs?: AuditLog[];

  @OneToMany(() => UserLibrary, (library) => library.user)
  userLibrary?: UserLibrary[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions: UserPermission[];
}
