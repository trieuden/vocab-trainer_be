import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('action_types')
export class ActionType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    actionName: string;

    @Column({ type: 'text', nullable: true })
    imageUrl?: string;
}