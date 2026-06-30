import { IsNumber, IsOptional } from "class-validator";

export class PageRequest {
  @IsOptional()
  @IsNumber()

  pageSize?: number;
  @IsOptional()
  @IsNumber()

  pageIndex?: number;
}