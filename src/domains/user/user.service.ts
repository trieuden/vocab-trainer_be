import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "@/entities";
import { UserRepo } from "@/repositories/user.repo";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { hashPassword } from "libs/core/utils/password.utils";

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepo) {}

  findAll(): Promise<User[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  findById(id: string): Promise<User | null> {
    return this.findOne(id);
  }

  private async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username, isDeleted: false } });
  }

  private async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email, isDeleted: false } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.findByEmail(dto.email);
    if (existing) throw new BadRequestException("Email already exists");
    const existingUser = await this.findByUsername(dto.username);
    if (existingUser) throw new BadRequestException("Username already exists");

    const password = await hashPassword(dto.password);
    const user = this.repo.create({
      ...dto,
      password,
      isAdmin: dto.isAdmin ?? false,
    });
    return this.repo.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException("User not found");

    if (dto.email && dto.email !== user.email) {
      const taken = await this.findByEmail(dto.email);
      if (taken) throw new BadRequestException("Email already exists");
    }
    if (dto.username && dto.username !== user.username) {
      const taken = await this.findByUsername(dto.username);
      if (taken) throw new BadRequestException("Username already exists");
    }

    let password = user.password;
    if (dto.password) password = await hashPassword(dto.password);

    Object.assign(user, {
      ...dto,
      password: dto.password ? password : user.password,
    });
    return this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException("User not found");
    user.isDeleted = true;
    await this.repo.save(user);
  }

  async validateUser(
    username: string,
    plainPassword: string,
  ): Promise<User | null> {
    const user = await this.repo.findOne({
      where: { username, isDeleted: false },
    });
    if (!user) return null;
    const ok = await bcrypt.compare(plainPassword, user.password);
    return ok ? user : null;
  }

  async updateLastActiveAt(id: string): Promise<void> {
    await this.repo.update({ id }, { lastActiveAt: new Date() });
  }

  async search(q?: string): Promise<User[]> {
    if (!q?.trim()) return this.findAll();
    const term = `%${q.trim()}%`;
    return this.repo
      .createQueryBuilder("u")
      .where("u.isDeleted = :d", { d: false })
      .andWhere(
        "(u.username ILIKE :t OR u.name ILIKE :t OR u.email ILIKE :t OR u.phone ILIKE :t)",
        { t: term },
      )
      .orderBy("u.createdAt", "DESC")
      .getMany();
  }
}
