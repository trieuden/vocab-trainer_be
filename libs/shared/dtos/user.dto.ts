import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/user.enum';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @ApiProperty({
    description: 'Tên đăng nhập của người dùng',
    example: 'user123',
  })
  @IsNotEmpty({ message: 'Username is required.' })
  @Length(3, 50, {
    message: 'Username must be between 3 and 50 characters long.',
  })
  username: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'Trieu123',
  })
  @IsNotEmpty({ message: 'Password is required.' })
  @Length(6, 100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @IsNotEmpty({ message: 'Name is required.' })
  @Length(3, 100)
  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'Huỳnh Ngọc A',
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'Ảnh đại diện của người dùng',
    type: 'string',
    format: 'binary',
    required: false,
  })
  avatar?: Express.Multer.File

  @IsNotEmpty({ message: 'Role ID is required.' })
  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'admin',
  })
  roleId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Giới tính của người dùng',
    example: 'MALE',
  })
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Ngày sinh của người dùng',
    example: '2000-01-01',
  })
  birthDate: Date;

  @IsOptional()
  @ApiProperty({
    description: 'Số điện thoại của người dùng',
    example: '0909090909',
    required: false,
  })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'abc@gmail.com',
  })
  email: string;

}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @Length(6, 100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @IsOptional()
  @Length(3, 100)
  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'Huỳnh Ngọc A',
    required: false,
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'Ảnh đại diện của người dùng',
    type: 'string',
    format: 'binary',
    required: false,
  })
  avatar: Express.Multer.File

  @IsOptional()
  @ApiProperty({
    description: 'Giới tính của người dùng',
    example: 'MALE',
    required: false,
  })
  gender: Gender;

  @IsOptional()
  @ApiProperty({
    description: 'Ngày sinh của người dùng',
    example: '2000-01-01',
    required: false,
  })
  birthDate?: Date;

  @IsOptional()
  @ApiProperty({
    description: 'Số điện thoại của người dùng',
    example: '0909090909',
    required: false,
  })
  phoneNumber: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    description:'is delete Avatar',
    default: false,
    required:false
  })
  isDeleteAvatar?: boolean
}
