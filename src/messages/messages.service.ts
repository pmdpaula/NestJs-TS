import { Injectable } from '@nestjs/common';
import { Message } from './message.d';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: 1,
      text: 'menssage 1',
    },
    {
      id: 2,
      text: 'menssage 2',
    },
  ];

  findAll() {
    return this.messages;
  }

  findById(id: number) {
    return this.messages.find((message) => message.id === id);
  }

  create(message: Message) {
    this.messages.push(message);
  }
}
