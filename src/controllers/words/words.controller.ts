import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WordService } from 'src/services/word/word.service';
import { Word } from 'src/entities/word.entity';
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('Words')
@Controller('words')
export class WordController {
  constructor(private readonly wordServices: WordService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all words',
  })
  findAll(): Promise<Word[]> {
    try {
      return this.wordServices.findAll();
    } catch (error) {
      throw error;
    }
  }
}
