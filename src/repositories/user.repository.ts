import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities';
import { CreateUserDto, UpdateUserDto } from '@/shared/dtos/user.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { hashPassword } from '@/core/utils/password.utils';
import { Gender } from '@/shared/enums/user.enum';
import { bcrypt } from 'bcrypt';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.find({ order: { createdAt: 'DESC' } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const existingEmail = await this.findByEmail(user.email);
      if (existingEmail) {
        throw new BadRequestException('Username or email already exists');
      }
      // Kiểm tra username
      const existingUsername = await this.findByUsername(user.username);
      if (existingUsername) {
        throw new BadRequestException('Username or email already exists');
      }
      // Mã hóa mật khẩu
      const password = await hashPassword(user.password);
      user.password = password;

      //Giới tính
      if (user.gender) {
        switch (user.gender) {
          case 'male':
            user.gender = Gender.MALE;
            break;
          case 'female':
            user.gender = Gender.FEMALE;
            break;
          default:
            user.gender = Gender.OTHER;
            break;
        }
      }
      const newUser = this.create(user);
      return this.save(newUser);
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOneBy({ id });
      if (!user) throw new NotFoundException('User not found');

      const updated = this.merge(user, dto);
      return await this.save(updated);
    } catch (error) {
      console.log('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.findOne({ where: { username } });
  }
}
