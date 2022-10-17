import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientDTO } from './dto/client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() data: ClientDTO) {
    return this.clientService.create(data);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.clientService.findOneById(id);
  }

  @Get('/planner/:id')
  findByPlannerEventId(@Param('id') id: string) {
    return this.clientService.findByPlannerEventId(id);
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.clientService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ClientDTO) {
    return this.clientService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
