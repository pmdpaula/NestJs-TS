import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './messageDto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.messagesService.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.messagesService.create(messageDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() messageDto: MessageDto,
  ) {
    try {
      return await this.messagesService.update({
        id,
        messageDto,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.messagesService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
