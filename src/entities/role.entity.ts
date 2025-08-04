import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User, RolePermission } from 'src/entities';


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    role_name: string;

    @OneToMany(() => User, (user) => user.role)
    users?: User[];

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
    rolePermissions?: RolePermission[];
}