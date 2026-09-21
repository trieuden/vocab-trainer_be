import { Injectable, OnModuleInit, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SystemConfig } from "@/entities/system-config.entity";
import { FindSystemConfigDto, UpdateSystemConfigDto } from "./dtos";

@Injectable()
export class SystemConfigService implements OnModuleInit {
  private readonly logger = new Logger(SystemConfigService.name);
  private cache = new Map<string, string>();

  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) {}

  async onModuleInit() {
    await this.refreshCache();
  }

  private async refreshCache() {
    try {
      const configs = await this.systemConfigRepository.find({
        select: { id: true, code: true, value: true, description: true },
        where: { isDeleted: false },
      });
      this.cache.clear();
      for (const config of configs) {
        this.cache.set(config.code, config.value);
      }
    } catch (error) {
      this.logger.error("Failed to refresh SystemConfig cache", error);
    }
  }

  async detail(code: string) {
    if (this.cache.has(code)) {
      return this.cache.get(code)!;
    }
    const config = await this.systemConfigRepository.findOne({
      select: { id: true, code: true, value: true, description: true },
      where: { code, isDeleted: false },
    });
    if (config) {
      this.cache.set(code, config.value);
      return config.value;
    }
    return process.env[code] || "";
  }

  getValue(code: string) {
    return this.detail(code);
  }

  async list(dto?: FindSystemConfigDto) {
    const where: any = { isDeleted: false };
    if (dto?.codes && dto.codes.length > 0) {
      where.code = In(dto.codes);
    }
    return this.systemConfigRepository.find({
      select: { id: true, code: true, value: true, description: true },
      where,
      order: { code: "ASC" },
    });
  }

  async update(dto: UpdateSystemConfigDto) {
    const config = await this.systemConfigRepository.findOne({
      select: { id: true, code: true, value: true, description: true },
      where: { code: dto.code, isDeleted: false },
    });

    if (!config) {
      throw new NotFoundException(`Không tìm thấy cấu hình với mã ${dto.code}`);
    }

    config.value = dto.value;
    if (dto.description !== undefined) {
      config.description = dto.description;
    }

    const updated = await this.systemConfigRepository.save(config);
    this.cache.set(dto.code, updated.value);
    return updated;
  }
}
