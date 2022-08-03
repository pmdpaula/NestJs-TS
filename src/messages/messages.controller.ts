import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
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
  async findById(@Param() params) {
    try {
      return await this.messagesService.findById(Number(params.id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.messagesService.create(messageDto);
  }

  @Put(':id')
  async update(@Param() params, @Body() messageDto: MessageDto) {
    try {
      return await this.messagesService.update({
        id: Number(params.id),
        messageDto,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param() params) {
    try {
      return await this.messagesService.delete(Number(params.id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
