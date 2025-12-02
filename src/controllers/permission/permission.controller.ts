import { Controller, Get, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from '@/services/permission/permission.service';
import { Permission } from '@/entities';

@ApiTags('Permissions')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all permissions',
  })
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAllPermissions();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get permission by ID',
  })
  findById(@Param('id') id: string): Promise<Permission | null> {
    return this.permissionService.findPermissionById(id);
  }

  @Get('/:permissionName/permissionName')
  @ApiOperation({
    summary: 'Get permission by name',
  })
  findByPermissionName(@Param('permissionName') permissionName: string): Promise<Permission | null> {
    return this.permissionService.findByPermissionName(permissionName);
  }
  
  @Get('/activePermissions/:userId/userId')
  @ApiOperation({
    summary: 'Get permission active for user',
  })
  findActivePermissionsByUserId(@Param('userId') userId: string): Promise<Permission[]> {
    return this.permissionService.findActivePermissionsByUserId(userId);
  }
}
