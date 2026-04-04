import { RoleRepository } from "./role.repository";
import { Injectable } from "@nestjs/common";
import { DataSource, In, Like, Not, Repository } from "typeorm";
import { User } from "src/entities";
import { CreateUserDto, UpdateUserDto } from "@/shared/dtos/user.dto";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { hashPassword } from "@/core/utils/password.utils";
import { Gender, UserStatus } from "@/shared/enums/user.enum";
import * as bcrypt from "bcrypt";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserRole } from "@/shared/enums/user.enum";
import { CloudinaryService } from "@/services/cloudinary/cloudinary.service";
import { UserPermissionRepository } from "./user-permission.repository";
import { UserPermission } from "@/entities/user-permission.entity";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        private readonly cloudinaryService: CloudinaryService,
        private readonly roleRepository: RoleRepository,
        private readonly userPermissionRepository: UserPermissionRepository
    ) {
        super(User, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<User | null> {
        return this.findOne({ where: { id, status: Not(UserStatus.DELETED) }, relations: ["role", "userPermissions.permission"] });
    }
    async findByRole(role: string): Promise<User[]> {
        return this.find({ where: { role: { roleName: role.toLowerCase() as UserRole }, status: Not(UserStatus.DELETED) }, relations: ["role", "userPermissions.permission"] });
    }

    async findAllUsers(): Promise<User[]> {
        return this.find({ order: { createdAt: "DESC" }, relations: ["role", "userPermissions.permission"], where: { status: Not(UserStatus.DELETED) } });
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        try {
            const user = await this.findOne({ where: { username, status: Not(UserStatus.DELETED) }, relations: ["role"] });
            if (user && (await bcrypt.compare(password, user.password))) {
                return user;
            }
            return null;
        } catch (error) {
            console.log("Error validating user:", error);
            throw error;
        }
    }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            const existingEmail = await this.findByEmail(user.email);
            if (existingEmail) {
                throw new BadRequestException("Username or email already exists");
            }
            // Kiểm tra username
            const existingUsername = await this.findByUsername(user.username);
            if (existingUsername) {
                throw new BadRequestException("Username or email already exists");
            }
            // Mã hóa mật khẩu
            const password = await hashPassword(user.password);
            user.password = password;

            //Giới tính
            if (user.gender) {
                switch (user.gender) {
                    case "male":
                        user.gender = Gender.MALE;
                        break;
                    case "female":
                        user.gender = Gender.FEMALE;
                        break;
                    default:
                        user.gender = Gender.OTHER;
                        break;
                }
            }
            let newAvatar = "";

            if (user.avatar) {
                const result = await this.cloudinaryService.uploadFile(user.avatar);
                newAvatar = result.secure_url;
            }

            const role = user.roleId ? await this.roleRepository.findOne({ where: { id: user.roleId }, relations: ["rolePermissions.permission"] }) : null;
            if (!role) {
                throw new BadRequestException("Invalid role");
            }

            const newUser = this.create({
                username: user.username,
                password: user.password,
                name: user.name,
                avatar: newAvatar,
                gender: user.gender,
                birthDate: user.birthDate,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role,
            });
            const savedUser = await this.save(newUser);

            if (role?.rolePermissions && role.rolePermissions.length > 0) {
                await Promise.all(
                    role.rolePermissions.map(async (rolePermission) => {
                        const newUserPermission = new UserPermission();
                        newUserPermission.user = savedUser;
                        newUserPermission.permission = rolePermission.permission;
                        await this.userPermissionRepository.save(newUserPermission);
                    })
                );
            }
            return savedUser;
        } catch (error) {
            console.log("Error creating user:", error);
            throw error;
        }
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.findOneBy({ id, status: Not(UserStatus.DELETED) });
            if (!user) throw new NotFoundException("User not found");

            let newAvatar = "";
            if (dto.avatar || dto.isDeleteAvatar) {
                try {
                    if (user.avatar) {
                        await this.cloudinaryService.deleteImageByUrl(user.avatar);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            if (dto.avatar) {
                try {
                    const result = await this.cloudinaryService.uploadFile(dto.avatar);
                    newAvatar = result.secure_url;
                } catch (error) {
                    console.error("Failed to delete avatar from Cloudinary:", error.message);
                }
            }

            const updated = this.merge(user, {
                password: dto.password,
                name: dto.name,
                avatar: dto.isDeleteAvatar === true ? "" : !!newAvatar ? newAvatar : user.avatar,
                gender: dto.gender,
                birthDate: dto.birthDate,
                phoneNumber: dto.phoneNumber,
            });
            return await this.save(updated);
        } catch (error) {
            console.log("Error updating user:", error);
            throw error;
        }
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.findOneBy({ id, status: Not(UserStatus.DELETED) });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        user.status = UserStatus.DELETED;
        await this.save(user);

    }

    async deleteUsers(ids: string[]): Promise<void> {
        const users = await this.find({ where: { id: In(ids), status: Not(UserStatus.DELETED) } });
        if (users.length !== ids.length) {
            throw new NotFoundException("Some users not found");
        }
        users.forEach(async (user) => {
            user.status = UserStatus.DELETED;
            await this.save(user);
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.findOne({ where: { email, status: Not(UserStatus.DELETED) }, relations: ["role"] });
    }
    async findByUsername(username: string): Promise<User | null> {
        return this.findOne({ where: { username, status: Not(UserStatus.DELETED) }, relations: ["role"] });
    }

    async updateLastActiveAt(id: string): Promise<void> {
        await this.update(id, { lastActiveAt: new Date() });
    }

    async updateUserStatus (id: string, status: UserStatus): Promise<void> {
        const user = await this.findOneBy({ id, status: Not(UserStatus.DELETED) });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        user.status = status;
        await this.save(user);
    }

    async searchUsers(search?: string): Promise<User[]> {
        if (!search) {
            return this.find({ where: { status: Not(UserStatus.DELETED) }, order: { createdAt: "DESC" }, relations: ["role", "userPermissions.permission"] });
        }

        const commonCondition = {
            status: Not(UserStatus.DELETED)
        };

        const users = await this.find({
            where: [
                { ... commonCondition,username: Like(`%${search}%`) },
                { ... commonCondition,name: Like(`%${search}%`) },
                { ... commonCondition,phoneNumber: Like(`%${search}%`) },
                { ... commonCondition,email: Like(`%${search}%`) },
            ],
            
            relations: ["role", "userPermissions.permission"],
        });
        return users;
    }
    async searchUsersWithRole(roleName: string, search?: string): Promise<User[]> {
        
        if (!search) {
            return this.find({ where: { role: { roleName: roleName.toLowerCase() as UserRole }, status: Not(UserStatus.DELETED) }, order: { createdAt: "DESC" }, relations: ["role", "userPermissions.permission"] });
        }

        const commonCondition = {
            role: { roleName: roleName.toLowerCase() as UserRole },
            status: Not(UserStatus.DELETED)
        };
        
        return this.find({
            where: [
                { ...commonCondition, username: Like(`%${search}%`) },
                { ...commonCondition, name: Like(`%${search}%`) },
                { ...commonCondition, phoneNumber: Like(`%${search}%`) },
                { ...commonCondition, email: Like(`%${search}%`) },
            ],
            order: { createdAt: "DESC" },
            relations: ["role", "userPermissions.permission"],
        }); 
    }
}
