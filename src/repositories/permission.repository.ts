import { Repository } from 'typeorm';
import { Permission } from '@/entities';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async findByPermissionName(permissionName: string): Promise<Permission | null> {
    return this.findOne({ where: { permissionName } });
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.find();
  }

  async findPermissionById(id: string): Promise<Permission | null> {
    return this.findOne({ where: { id } });
  }
}
