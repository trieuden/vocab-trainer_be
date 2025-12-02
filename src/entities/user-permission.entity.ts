import {
    PrimaryGeneratedColumn,
    Entity,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { User, Permission } from 'src/entities';
  
  @Entity('user_permissions')
  export class UserPermission {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.userPermissions)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;
  }
  