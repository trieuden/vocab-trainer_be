import { UserType } from "@/common/enums";
import { IsOptional, IsString } from "class-validator";
import { PageRequest } from "@/common/dtos/page-request";

export class FindUserDto extends PageRequest {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    type?: UserType;
}
