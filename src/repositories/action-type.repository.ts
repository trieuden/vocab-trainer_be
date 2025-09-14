import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ActionType } from '@/entities/action-type.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateActionTypeDto, UpdateActionTypeDto } from '@/shared/dtos/action-type.dto';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ActionTypeRepository extends Repository<ActionType> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(ActionType, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<ActionType | null> {
    return this.findOne({ where: { id } });
  }

  async findAllActionTypes(): Promise<ActionType[]> {
    return this.find({ order: { createdAt: 'DESC' } });
  }

  async createActionType(actionType: CreateActionTypeDto): Promise<ActionType> {
    const newActionType = this.create(actionType);
    return this.save(newActionType);
  }

  async updateActionType(id: string, actionType: UpdateActionTypeDto): Promise<ActionType> {
    const existingActionType = await this.findById(id);
    if (!existingActionType) {
      throw new NotFoundException('Action type not found');
    }
    const updated = this.merge(existingActionType, actionType);
    return this.save(updated);
  }
}
