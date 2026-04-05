import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRolePermissionDto {
  @ApiProperty()
  @IsNotEmpty({ message: "roleID is required" })
  roleId: string;

  @ApiProperty()
  @IsNotEmpty({ message: "permissionId is required" })
  permissionId: string;
}
