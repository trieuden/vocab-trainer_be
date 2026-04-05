import { PartialType } from "@nestjs/swagger";
import { CreateTaskQuestionDto } from "./create-task-question.dto";

export class UpdateTaskQuestionDto extends PartialType(CreateTaskQuestionDto) {}
