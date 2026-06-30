import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepo } from "@/repositories/user.repo";
import { CreateUserDto, FindUserDto, UpdateUserDto } from "./dtos";
import { Transaction } from "@/core/decorators/transaction.decorator";
import { Like } from "typeorm";

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepo) {}

    async find(dto: FindUserDto) {
        try {
            const { pageSize, pageIndex, ...body } = dto;
            let where : any = {}

            if(body.username) where.username =Like(`%${body.username}%`);
            if(body.email) where.email =Like(`%${body.email}%`);
            if(body.phone) where.phone =Like(`%${body.phone}%`);
            if(body.type) where.type = body.type;
            if(body.name) where.name =Like(`%${body.name}%`);

            const [data, total] = await this.repo.findAndCount({
                where,
                order: { createdAt: "DESC" },
                skip: (pageIndex ?? 1) - 1,
                take: pageSize,
            });
            return {
                data,
                total,
            };
        } catch (error) {
            console.log(error);

            throw new BadRequestException(error.message);
        }
    }

    @Transaction()
    async create(dto: CreateUserDto) {
        const byEmail = await this.repo.findOne({
            where: { email: dto.email, isDeleted: false },
        });

        if (byEmail) throw new BadRequestException("Email already exists");
        const byUser = await this.repo.findOne({
            where: { username: dto.username, isDeleted: false },
        });
        if (byUser) throw new BadRequestException("Username already exists");

        const user = this.repo.create({
            ...dto,
            isAdmin: dto.isAdmin ?? false,
        });
        return this.repo.save(user);
    }

    @Transaction()
    async update(id: string, dto: UpdateUserDto) {
        const user = await this.repo.findOne({
            where: { id, isDeleted: false },
        });
        if (!user) throw new NotFoundException("User not found");

        if (dto.email && dto.email !== user.email) {
            const taken = await this.repo.findOne({
                where: { email: dto.email, isDeleted: false },
            });
            if (taken) throw new BadRequestException("Email already exists");
        }
        if (dto.username && dto.username !== user.username) {
            const taken = await this.repo.findOne({
                where: { username: dto.username, isDeleted: false },
            });
            if (taken) throw new BadRequestException("Username already exists");
        }

        const { password: plainPassword, ...rest } = dto;
        Object.assign(user, rest);
        if (plainPassword !== undefined && plainPassword !== "") {
            user.password = plainPassword;
        }
        return this.repo.save(user);
    }

    @Transaction()
    async remove(id: string) {
        const user = await this.repo.findOne({
            where: { id, isDeleted: false },
        });
        if (!user) throw new NotFoundException("User not found");
        user.isDeleted = true;
        await this.repo.save(user);
    }

    async validateUser(username: string, plainPassword: string) {
        const user = await this.repo.findOne({
            where: { username, isDeleted: false },
        });
        if (!user) return null;
        const ok = await bcrypt.compare(plainPassword, user.password);
        return ok ? user : null;
    }

    async updateLastActiveAt(id: string) {
        await this.repo.update({ id }, { lastActiveAt: new Date() });
    }
}
