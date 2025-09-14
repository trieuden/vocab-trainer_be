import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionType } from 'src/entities';
import { ActionTypeController } from '@/controllers/action-type/action-type.controller';
import { ActionTypeService } from '@/services/action-type/action-type.service';
import { ActionTypeRepository } from '@/repositories/action-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActionType])],
  providers: [ActionTypeService, ActionTypeRepository],
  controllers: [ActionTypeController],
  exports: [ActionTypeService, ActionTypeRepository],
})
export class ActionTypeModule {}
