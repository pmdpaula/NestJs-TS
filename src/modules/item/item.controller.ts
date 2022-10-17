import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemDTO } from './dto/item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() data: ItemDTO) {
    return this.itemService.create(data);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('/inStock')
  findAllInStock() {
    return this.itemService.findAllInStock();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.itemService.findOneById(id);
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.itemService.findByName(name);
  }

  @Get('/category/:categoryId')
  findManyByCategoryId(@Param('categoryId') categoryId: string) {
    return this.itemService.findManyByCategoryId(categoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ItemDTO) {
    return this.itemService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
