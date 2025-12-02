import { Controller, Get, Put, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Param, Body } from '@nestjs/common';
import { UserPermissionService } from '@/services/user-permission/user-permission.service';
import { UserPermission } from '@/entities/user-permission.entity';

@ApiTags('User-Permissions')
@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all user-permissions',
  })
  findAll(): Promise<UserPermission[]> {
    return this.userPermissionService.findAll();
  }

  @Get('/:userId/userId')
  @ApiOperation({
    summary: 'Get user-permissions by User ID',
  })
  findByUserId(@Param('userId') userId: string): Promise<UserPermission[]> {
    return this.userPermissionService.findByUserId(userId);
  }

  @Get('/:id/id')
  @ApiOperation({
    summary: 'Get user-permission by ID',
  })
  findById(@Param('id') id: string): Promise<UserPermission | null> {
    return this.userPermissionService.findUserPermissionById(id);
  }
}
