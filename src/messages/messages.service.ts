import { Injectable } from '@nestjs/common';
import { Message } from './message.d';
import { MessageDto } from './messageDto';

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
    return this.messages.filter(Boolean);
  }

  async findById(id: number) {
    const message = this.messages.find((msg) => msg?.id === id);

    if (!message) {
      throw new Error(`Messagem com o ID '${id}' não encontrada.`);
    }

    return message;
  }

  create(messageDto: MessageDto) {
    // const id = this.messages.length + 1;
    const id = Math.max(...this.messages.map((msg) => msg.id)) + 1;

    const newMessage = {
      id,
      ...messageDto,
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  async update({ id, messageDto }: { id: number; messageDto: MessageDto }) {
    const index = this.messages.findIndex((msg) => msg?.id === id);

    if (index < 0) {
      throw new Error(`Messagem com o ID '${id}' não encontrada.`);
    }

    const newMessage = {
      id,
      ...messageDto,
    };

    this.messages[index] = newMessage;

    return newMessage;
  }

  async delete(id: number) {
    const index = this.messages.findIndex((msg) => msg?.id === id);

    if (index < 0) {
      throw new Error(`Messagem com o ID '${id}' não encontrada.`);
    }

    delete this.messages[index];
    return 'Mensagem deletada com sucesso.';
  }
}
