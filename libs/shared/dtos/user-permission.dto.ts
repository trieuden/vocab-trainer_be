import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserPermissionDto {
  @ApiProperty({
    description: "User ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty({ message: "User ID is required." })
  userId: string;

  @ApiProperty({
    description: "Permission ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty({ message: "Permission ID is required." })
  permissionId: string;
}
