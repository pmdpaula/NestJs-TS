import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipeDTO } from './dto/recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() data: RecipeDTO) {
    return this.recipeService.create(data);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.recipeService.findOneById(id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.recipeService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: RecipeDTO) {
    return this.recipeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
