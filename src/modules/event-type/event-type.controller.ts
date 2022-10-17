import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventTypeDTO } from './dto/event-type.dto';
import { EventTypeService } from './event-type.service';

@Controller('recipe')
export class EventTypeController {
  constructor(private readonly recipeService: EventTypeService) {}

  @Post()
  create(@Body() data: EventTypeDTO) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EventTypeDTO) {
    return this.recipeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
