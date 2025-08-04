import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Entity, ManyToOne } from "typeorm";
import { User, Library } from 'src/entities';

@Entity('user_libraries')
export class UserLibrary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.userLibrary)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Library, (library) => library.userLibrary)
  @JoinColumn({ name: 'libraryId' })
  library: Library;
}