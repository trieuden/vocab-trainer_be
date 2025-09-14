import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from 'src/entities';
import { AuditLogController } from 'src/controllers/audit-log/audit-log.controller';
import { AuditLogService } from 'src/services/audit-log/audit-log.service';
import { AuditLogRepository } from '@/repositories/audit-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogController],
  providers: [AuditLogService, AuditLogRepository],
  exports: [AuditLogService, AuditLogRepository],
})
export class AuditLogModule {}
