import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WordService } from 'src/services/word/word.service';
import { Word } from 'src/entities/word.entity';
import { CreateWordDto, UpdateWordDto } from '@/shared/dtos/word.dto';

@ApiTags('Words')
@Controller('words')
export class WordController {
  constructor(private readonly wordServices: WordService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all words',
  })
  findAll(): Promise<Word[]> {
    return this.wordServices.findAllWords();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get word by ID',
  })
  findById(@Param('id') id: string): Promise<Word | null> {
    return this.wordServices.findWordById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new word',
  })
  createWord(@Body() word: CreateWordDto): Promise<Word> {
    return this.wordServices.createWord(word);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update a word',
  })
  updateWord(@Param('id') id: string, @Body() word: UpdateWordDto): Promise<Word> {
    return this.wordServices.updateWord(id, word);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a word',
  })
  deleteWord(@Param('id') id: string): Promise<void> {
    return this.wordServices.deleteWord(id);
  }
}
