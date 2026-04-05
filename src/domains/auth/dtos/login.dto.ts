import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
