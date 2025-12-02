import { AuditLogService } from '@/services/audit-log/audit-log.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditLog } from '@/entities';
import { CreateAuditLog } from '@/shared/dtos/audit-log.dto';

@ApiTags('Audit Logs')
@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all audit logs',
  })
  findAll(): Promise<AuditLog[]> {
    return this.auditLogService.findAllAuditLogs();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new audit log',
  })
  create(@Body() auditLog: CreateAuditLog): Promise<AuditLog> {
    return this.auditLogService.createAuditLog(auditLog);
  }

  @Get('/:id/id')
  @ApiOperation({
    summary: 'Get audit log by ID',
  })
  findById(@Param() id: string): Promise<AuditLog | null> {
    return this.auditLogService.findById(id);
  }

  @Get('/:userId/userId')
  @ApiOperation({
    summary: 'Get audit logs by User ID',
  })
  findByUserId(@Param() userId: string): Promise<AuditLog[]> {
    return this.auditLogService.findByUserId(userId);
  }
}
