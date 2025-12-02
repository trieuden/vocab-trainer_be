import { RoleService } from '@/services/role/role.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Role } from '@/entities';
import { CreateRoleDto } from '@/shared/dtos/role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all roles',
  })
  findAll(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get role by ID',
  })
  findById(@Param('id') id: string): Promise<Role | null> {
    return this.roleService.findRoleById(id);
  }

  @Get('/:roleName/roleName')
  @ApiOperation({
    summary: 'Get role by name',
  })
  findByRoleName(@Param('roleName') roleName: string): Promise<Role | null> {
    return this.roleService.findByRoleName(roleName);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
  })
  createRole(@Body() role: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(role);
  }
}
