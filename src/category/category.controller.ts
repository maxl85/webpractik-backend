import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(dto);
  }

  @Get()
  findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.categoryService.delete(+id);
  }
}
