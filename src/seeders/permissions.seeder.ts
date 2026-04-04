import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission, Role, User } from "../entities/";


@Injectable()
export class PermissionSeeder {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) {}

    async seed() {
        // Kiểm tra xem đã có data chưa
        const permissionCount = await this.permissionRepository.count();
        if (permissionCount > 0) {
            return;
        }

        await this.permissionRepository.save([
            {
                permissionName: "ADMIN_P_USERS",
            },
            {
                permissionName: "ADMIN_P_AUDITLOGS",
            },
            {
                permissionName: "ADMIN_P_LIBRARIES",
            },
            {
                permissionName: "ADMIN_P_PERMISSIONS",
            },
            {
                permissionName: "ADMIN_P_ROLES",
            },
            {
                permissionName: "ADMIN_P_TOPICS",
            },
            {
                permissionName: "ADMIN_P_WORDS",
            },
            {
                permissionName: "USER_S_ACCESS",
            },
        ]);
    }
}
