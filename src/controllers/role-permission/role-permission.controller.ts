import { RolePermissionService } from '@/services/role-permission/role-permission.service';
import { Controller, Get, Put, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolePermission } from '@/entities';
import { Param, Body } from '@nestjs/common';

@ApiTags('Role-Permissions')
@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all role-permissions',
  })
  findAll(): Promise<RolePermission[]> {
    return this.rolePermissionService.findAll();
  }

  @Get('/getByRoleId/:roleId')
  @ApiOperation({
    summary: 'Get role-permissions by Role ID',
  })
  findByRoleId(@Param('roleId') roleId: string): Promise<RolePermission[]> {
    return this.rolePermissionService.findByRoleId(roleId);
  }

  @Get('/getById/:id')
  @ApiOperation({
    summary: 'Get role-permission by ID',
  })
  findById(@Param('id') id: string): Promise<RolePermission | null> {
    return this.rolePermissionService.findById(id);
  }
}
