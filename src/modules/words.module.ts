import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from 'src/entities';
import { WordService } from '../services/word/word.service';
import { WordController } from '../controllers/words/words.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Word])],
    controllers: [WordController],
    providers: [WordService],
    exports: [WordService],
})
export class WordsModule {
    
}
