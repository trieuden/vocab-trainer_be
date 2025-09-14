import { ApiProperty } from '@nestjs/swagger';
import { Library } from './../../../src/entities/library.entity';
import { Column } from 'typeorm';

export class CreateLibraryDto {
  @ApiProperty({
    description: 'Tên thư viện',
    required: true,
    example: 'My Vocabulary Library',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  libraryName: string;

  @ApiProperty({
    description: 'Mô tả về thư viện',
    required: false,
    example: 'Thư viện từ vựng tiếng Anh của tôi',
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'URL hình ảnh đại diện cho thư viện',
    required: false,
    example: 'https://example.com/image.png',
  })
  @Column({ type: 'text', nullable: true })
  imageUrl?: string;
}

export class UpdateLibraryDto {
  @ApiProperty({
    description: 'Tên thư viện',
    required: true,
    example: 'My Vocabulary Library',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  libraryName: string;

  @ApiProperty({
    description: 'Mô tả về thư viện',
    required: false,
    example: 'Thư viện từ vựng tiếng Anh của tôi',
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'URL hình ảnh đại diện cho thư viện',
    required: false,
    example: 'https://example.com/image.png',
  })
  @Column({ type: 'text', nullable: true })
  imageUrl?: string;
}
