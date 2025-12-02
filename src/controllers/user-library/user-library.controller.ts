import { UserLibraryService } from '@/services/user-library/user-library.service';
import { CreateUserLibraryDto } from '@/shared/dtos/user-library.dto';
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User Library')
@Controller('user-library')
export class UserLibraryController {
  constructor(private readonly userLibraryServices: UserLibraryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user libraries' })
  async getAllUserLibraries() {
    return this.userLibraryServices.getAllUserLibraries();
  }

  @Get('/:id/id')
  @ApiOperation({ summary: 'Get user library by ID' })
  async getUserLibraryById(@Param('id') id: string) {
    return this.userLibraryServices.getUserLibraryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user library' })
  async createUserLibrary(@Body() userLibrary: CreateUserLibraryDto) {
    return this.userLibraryServices.createUserLibrary(userLibrary);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a user library by ID' })
  async deleteUserLibrary(@Param('id') id: string) {
    return this.userLibraryServices.deleteUserLibrary(id);
  }
}
