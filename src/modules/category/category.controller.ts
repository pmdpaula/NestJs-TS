import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() data: Category) {
    return this.categoryService.create(data);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.categoryService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Category) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
