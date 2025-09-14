import { AuditLog } from '@/entities';
import { CreateAuditLog } from '@/shared/dtos/audit-log.dto';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLogRepository extends Repository<AuditLog> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(AuditLog, dataSource.createEntityManager());
  }

  async createAuditLog(auditLog: CreateAuditLog): Promise<AuditLog> {
    try {
      const user = await this.findOne({ where: { id: auditLog.userId } });
      if (!user) {
        throw new Error('User not found');
      }
      const actionType = await this.findOne({ where: { id: auditLog.actionTypeId } });
      if (!actionType) {
        throw new Error('Action type not found');
      }
      const newAuditLog = this.create({
        action_details: auditLog.actionDetail,
        action_time: new Date(),
        user: user,
        actionType: { id: auditLog.actionTypeId } as any,
      });
      return this.save(newAuditLog);
    } catch (error) {
      console.log('Error creating audit log:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<AuditLog | null> {
    return this.findOne({ where: { id } });
  }

  async findAllAuditLogs(): Promise<AuditLog[]> {
    return this.find({ order: { action_time: 'DESC' }, relations: ['user', 'actionType'] });
  }

  async findByUserId(userId: string): Promise<AuditLog[]> {
    return this.find({ where: { user: { id: userId } }, order: { action_time: 'DESC' }, relations: ['user', 'actionType'] });
  }
}
