import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "@/shared/dtos/user.dto";
import { hashPassword } from "@/core/utils/password.utils";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { UserStatus } from "@/shared/enums/user.enum";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }

    async findByRole(role: string): Promise<User[]> {
        return this.userRepository.findByRole(role);
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        return this.userRepository.validateUser(username, password);
    }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            return this.userRepository.createUser(user);
        } catch (error) {
            console.log("Error creating user:", error);
            throw new BadRequestException("Failed to create user");
        }
    }

    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        try {
            // Mã hóa mật khẩu
            if (user.password) {
                const password = await hashPassword(user.password);
                user.password = password;
            }
            return this.userRepository.updateUser(id, user);
        } catch (error) {
            console.log("Error updating user:", error);
            throw new BadRequestException("Failed to update user");
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.userRepository.deleteUser(id);
        } catch (error) {
            console.log("Error deleting user:", error);
            throw new BadRequestException("Failed to delete user");
        }
    }

    async deleteUsers(ids: string[]): Promise<void> {
        try {
            await this.userRepository.deleteUsers(ids);
        } catch (error) {
            console.log("Error deleting user:", error);
            throw new BadRequestException("Failed to delete user");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findByUsername(username);
    }

    async updateLastActiveAt(id: string): Promise<void> {
        await this.userRepository.updateLastActiveAt(id);
    }

    async updateUserStatus(id: string, status: UserStatus) : Promise<void> {
        await this.userRepository.updateUserStatus(id, status)
    }


    async searchUsers(search?: string): Promise<User[]> {
        return this.userRepository.searchUsers(search);
    }

    async searchUsersWithRole(roleName: string, search?: string): Promise<User[]> {
        return this.userRepository.searchUsersWithRole(roleName, search);
    }
}
