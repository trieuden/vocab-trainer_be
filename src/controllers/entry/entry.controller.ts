import { EntryService } from '@/services/entry/entry.service';
import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Entry } from '@/entities';
import { CreateEntryDto, UpdateEntryDto } from 'libs/shared/dtos/entry.dto';

@ApiTags('Entries')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all entries',
  })
  findAll(): Promise<Entry[]> {
    return this.entryService.findAllEntries();
  }

  @Get('/getById/:id')
  @ApiOperation({
    summary: 'Get entry by ID',
  })
  findById(@Param() id: string): Promise<Entry | null> {
    return this.entryService.findEntryById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new entry',
  })
  create(@Body() entry: CreateEntryDto): Promise<Entry> {
    return this.entryService.createEntry(entry);
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update an existing entry',
  })
  update(@Param('id') id: string, @Body() entry: UpdateEntryDto): Promise<Entry> {
    return this.entryService.updateEntry(id, entry);
  }
}
