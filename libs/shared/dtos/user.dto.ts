import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { Gender, UserStatus } from '../enums/user.enum';
import { IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Tên đăng nhập của người dùng',
    example: 'user123',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'Huỳnh Ngọc A',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'admin',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  roleId: string;

  @ApiProperty({
    description: 'Giới tính của người dùng',
    example: 'MALE',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Email của người dùng',
    example: 'abc@gmail.com',
  })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Trạng thái của người dùng',
    example: 'ACTIVE',
  })
  @IsEnum(UserStatus)
  status: UserStatus;
}
