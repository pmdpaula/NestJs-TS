import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }
  // create(@Body() data: Role) {
  //   return this.roleService.create(data);
  // }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.roleService.findOneById(id);
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.roleService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Role) {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
