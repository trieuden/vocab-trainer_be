import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UpdateUserDto extends CreateUserDto {
    @ApiProperty()
    @IsUUID()
    id: string;
}
