import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Role, Permission } from 'src/entities';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}
