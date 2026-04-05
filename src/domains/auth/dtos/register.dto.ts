import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
  Matches,
} from "class-validator";
import { UserType } from "@/common/enums/EUser";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Password must contain uppercase, lowercase, and number.",
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ enum: UserType })
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;
}
