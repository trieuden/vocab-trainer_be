import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { Gender } from '../enums/user.enum';
export class RegisterDto {
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
    description: 'Giới tính của người dùng',
    example: 'MALE',
    required: false,
  })
  gender: Gender;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'abc@gmail.com',
  })
  email: string;
}
