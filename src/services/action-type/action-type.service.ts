import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActionType } from "@/entities";
import { ActionTypeRepository } from "@/repositories/action-type.repository";
import {
  CreateActionTypeDto,
  UpdateActionTypeDto,
} from "@/shared/dtos/action-type.dto";

@Injectable()
export class ActionTypeService {
  constructor(private readonly actionTypeRepository: ActionTypeRepository) {}

  async findById(id: string): Promise<ActionType | null> {
    return this.actionTypeRepository.findById(id);
  }
  async findAllActionTypes(): Promise<ActionType[]> {
    return this.actionTypeRepository.findAllActionTypes();
  }
  async createActionType(actionType: CreateActionTypeDto): Promise<ActionType> {
    return this.actionTypeRepository.createActionType(actionType);
  }
  async updateActionType(
    id: string,
    actionType: UpdateActionTypeDto,
  ): Promise<ActionType> {
    return this.actionTypeRepository.updateActionType(id, actionType);
  }
}
