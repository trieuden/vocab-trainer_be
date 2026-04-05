import { PartialType } from "@nestjs/swagger";
import { CreateTaskResultDto } from "./create-task-result.dto";

export class UpdateTaskResultDto extends PartialType(CreateTaskResultDto) {}
