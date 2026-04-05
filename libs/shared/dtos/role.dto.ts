import { ApiProperty } from "@nestjs/swagger";
import { CreateRolePermissionDto } from "./role-permission.dto";

export class CreateRoleDto {
  @ApiProperty({
    description: "Role name",
    required: true,
    example: "admin",
  })
  roleName: string;

  @ApiProperty({
    description: "Role Permission",
  })
  rolePermissions: CreateRolePermissionDto[];
}

export class UpdateRoleDto {
  @ApiProperty({
    description: "Role name",
    required: false,
    example: "admin",
  })
  roleName?: string;

  @ApiProperty({
    description: "Role Permission",
  })
  rolePermissions?: CreateRolePermissionDto[];
}
