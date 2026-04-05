import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class CreateStudentGroupDto {
  @ApiProperty()
  @IsUUID()
  studentId: string;

  @ApiProperty()
  @IsUUID()
  teacherId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;
}
