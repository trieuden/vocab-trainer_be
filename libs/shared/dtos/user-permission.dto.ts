import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPermissionDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  permissionId: string;
}
