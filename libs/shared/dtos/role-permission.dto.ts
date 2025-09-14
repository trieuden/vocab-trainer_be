import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty()
  roleId: string;
  @ApiProperty()
  permissionId: string;
}
