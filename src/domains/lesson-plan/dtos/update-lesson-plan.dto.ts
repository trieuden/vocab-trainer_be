import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateLessonPlanDto } from "./create-lesson-plan.dto";

export class UpdateLessonPlanDto extends PartialType(CreateLessonPlanDto) {
  @ApiProperty({ description: "ID giáo án cần cập nhật", example: "b2f6b3e8-5421-4f3b-8514-991fcf3f8e53" })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
