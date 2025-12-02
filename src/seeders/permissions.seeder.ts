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
                permission_name: "ADMIN_P_USERS",
            },
            {
                permission_name: "ADMIN_P_AUDITLOGS",
            },
            {
                permission_name: "ADMIN_P_LIBRARIES",
            },
            {
                permission_name: "ADMIN_P_PERMISSIONS",
            },
            {
                permission_name: "ADMIN_P_ROLES",
            },
            {
                permission_name: "ADMIN_P_TOPICS",
            },
            {
                permission_name: "ADMIN_P_WORDS",
            },
            {
                permission_name: "USER_S_ACCESS",
            },
        ]);
    }
}
