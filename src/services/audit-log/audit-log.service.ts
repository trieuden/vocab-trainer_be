import { AuditLog } from '@/entities';
import { AuditLogRepository } from '@/repositories/audit-log.repository';
import { CreateAuditLog } from '@/shared/dtos/audit-log.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLogService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async createAuditLog(auditLog: CreateAuditLog): Promise<AuditLog> {
    return this.auditLogRepository.createAuditLog(auditLog);
  }
  async findById(id: string): Promise<AuditLog | null> {
    return this.auditLogRepository.findById(id);
  }
  async findAllAuditLogs(): Promise<AuditLog[]> {
    return this.auditLogRepository.findAllAuditLogs();
  }
  async findByUserId(userId: string): Promise<AuditLog[]> {
    return this.auditLogRepository.findByUserId(userId);
  }
}
