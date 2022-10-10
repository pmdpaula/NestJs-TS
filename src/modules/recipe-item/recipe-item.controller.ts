import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipeItem } from '@prisma/client';
import { RecipeItemDTO } from './dto/recipe-item.dto';
import { RecipeItemService } from './recipe-item.service';

@Controller('recipeItem')
export class RecipeItemController {
  constructor(private readonly recipeItemService: RecipeItemService) {}

  @Post()
  create(@Body() data: RecipeItem) {
    return this.recipeItemService.create(data);
  }

  @Get()
  findAll() {
    return this.recipeItemService.findAll();
  }

  @Get('/inStock')
  findAllInStock() {
    return this.recipeItemService.findAllInStock();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.recipeItemService.findOneById(id);
  }

  @Get('/search/:name')
  findManyByName(@Param('name') name: string) {
    return this.recipeItemService.findManyByName(name);
  }

  @Get('/category/:categoryId')
  findManyByCategoryId(@Param('categoryId') categoryId: string) {
    return this.recipeItemService.findManyByCategoryId(categoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: RecipeItemDTO) {
    return this.recipeItemService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeItemService.remove(id);
  }
}
