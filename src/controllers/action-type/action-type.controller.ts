import { ActionTypeService } from '@/services/action-type/action-type.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActionType } from '@/entities';
import { CreateActionTypeDto, UpdateActionTypeDto } from '@/shared/dtos/action-type.dto';

@ApiTags('Action Types')
@Controller('action-type')
export class ActionTypeController {
  constructor(private readonly actionTypeService: ActionTypeService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all action types',
  })
  findAll(): Promise<ActionType[]> {
    return this.actionTypeService.findAllActionTypes();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get action type by ID',
  })
  findById(@Param() id: string): Promise<ActionType | null> {
    return this.actionTypeService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new action type',
  })
  createActionType(@Body() actionType: CreateActionTypeDto): Promise<ActionType> {
    return this.actionTypeService.createActionType(actionType);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update an existing action type',
  })
  updateActionType(@Param() id: string, @Body() actionType: UpdateActionTypeDto): Promise<ActionType> {
    return this.actionTypeService.updateActionType(id, actionType);
  }
}
