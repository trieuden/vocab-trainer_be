import { ApiProperty } from "@nestjs/swagger";

export class CreateActionTypeDto {
  @ApiProperty({
    description: "Tên loại hành động",
    example: "CREATE",
  })
  actionName: string;
  @ApiProperty({
    description: "URL hình ảnh đại diện cho loại hành động",
    example: "https://example.com/image.png",
    required: false,
  })
  imageUrl?: string;
}

export class UpdateActionTypeDto {
  @ApiProperty({
    description: "Tên loại hành động",
    example: "CREATE",
  })
  actionName: string;
  @ApiProperty({
    description: "URL hình ảnh đại diện cho loại hành động",
    example: "https://example.com/image.png",
    required: false,
  })
  imageUrl?: string;
}
