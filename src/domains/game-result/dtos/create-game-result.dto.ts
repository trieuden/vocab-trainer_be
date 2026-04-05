import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsUUID, Min } from "class-validator";

export class CreateGameResultDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsNumber()
  gradeScale: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  version: number;
}
