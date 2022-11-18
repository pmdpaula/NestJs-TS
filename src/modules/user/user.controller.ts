import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { RoleDef } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';
// import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleDef.Admin)
  create(@Body() data: User) {
    return this.userService.create(data);
  }
  // create(@Body() data: CreateUserDto) {
  //   return this.userService.create(data);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // @Get('/username/:username')
  // findByUsername(@Param('name') username: string) {
  //   return this.userService.findByUsername(username);
  // }

  @Get('/email/:email')
  findByEmail(@Param('name') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: User) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
