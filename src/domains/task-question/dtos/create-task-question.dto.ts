import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateTaskQuestionDto {
  @ApiProperty()
  @IsUUID()
  taskId: string;

  @ApiProperty()
  @IsUUID()
  questionId: string;
}
