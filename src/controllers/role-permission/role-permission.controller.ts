import { RolePermissionService } from '@/services/role-permission/role-permission.service';
import { Controller, Get, Put, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolePermission } from '@/entities';
import { Param, Body } from '@nestjs/common';
import { CreateRolePermissionDto } from '@/shared/dtos/role-permission.dto';

@ApiTags('Role-Permissions')
@Controller('role-permissions')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all role-permissions',
  })
  findAll(): Promise<RolePermission[]> {
    return this.rolePermissionService.findAll();
  }

  @Get('/:roleId/roleId')
  @ApiOperation({
    summary: 'Get role-permissions by Role ID',
  })
  findByRoleId(@Param('roleId') roleId: string): Promise<RolePermission[]> {
    return this.rolePermissionService.findByRoleId(roleId);
  }

  @Get('/:id/id')
  @ApiOperation({
    summary: 'Get role-permission by ID',
  })
  findById(@Param('id') id: string): Promise<RolePermission | null> {
    return this.rolePermissionService.findById(id);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create role-permission'
  })
  create(@Body() rolePermission: CreateRolePermissionDto) : Promise<RolePermission | null> {
    return this.rolePermissionService.createRolePermission(rolePermission)
  }

  @Delete('/:id/id')
  @ApiOperation({
    summary:'Delete role-permission'
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.rolePermissionService.deleteRolePermission(id)
  }
}
