import { ApiProperty } from '@nestjs/swagger';

export class CreateUserLibraryDto {
  @ApiProperty({
    description: 'Name of the user library',
    required: true,
    example: 'My Favorite Books',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the user',
    required: true,
    example: 'user-uuid-1234',
  })
  userId: string;

  @ApiProperty({
    description: 'ID of the library',
    required: true,
    example: 'library-uuid-5678',
  })
  libraryId: string;
}
