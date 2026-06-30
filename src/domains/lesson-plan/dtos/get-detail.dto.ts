import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetDetailDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
