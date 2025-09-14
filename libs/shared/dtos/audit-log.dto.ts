import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditLog {
  @ApiProperty({
    description: 'Tên hành động',
    example: 'CREATE',
  })
  actionDetail: string;

  @ApiProperty({
    description: 'ID người dùng thực hiện hành động',
    example: 'user-123',
  })
  userId: string;

  @ApiProperty({
    description: 'ID loại hành động',
    example: 'action-type-123',
  })
  actionTypeId: string;
}
