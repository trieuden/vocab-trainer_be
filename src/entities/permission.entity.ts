import { OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column, Entity } from 'typeorm';
import { RolePermission } from 'src/entities/role-permission.entity';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    permissionName: string;

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
    rolePermissions?: RolePermission[];
}