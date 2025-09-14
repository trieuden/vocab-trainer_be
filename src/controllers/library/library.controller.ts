import { Controller, Param, Get, Post, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { LibraryService } from '@/services/library/library.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Library, User } from '@/entities';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@/decorators/get-user.decorator';
import { CreateLibraryDto, UpdateLibraryDto } from '@/shared/dtos/library.dto';

@ApiTags('Libraries')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all libraries',
  })
  findAll(): Promise<Library[]> {
    return this.libraryService.findAllLibraries();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Library | null> {
    return this.libraryService.findLibraryById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({
    summary: 'Create a new library',
  })
  create(@Body() library: Partial<CreateLibraryDto>, @GetUser() user: User): Promise<Library> {
    return this.libraryService.createLibrary(library, user);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update an existing library',
  })
  update(@Param() id: string, @Body() library: Partial<UpdateLibraryDto>): Promise<Library> {
    return this.libraryService.updateLibrary(id, library);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a library',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.libraryService.deleteLibrary(id);
  }
}
