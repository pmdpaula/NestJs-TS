import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { EventTypeDTO } from './dto/event-type.dto';
// import { CreateEventTypeDto } from './dto/create-eventType.dto';
// import { UpdateEventTypeDto } from './dto/update-eventType.dto';

// const selectAllFieldsWithCategoryName = {
//   id: true,
//   name: true,
//   value: true,
//   boughtDate: true,
//   stock: true,
//   Category: {
//     select: {
//       id: true,
//       name: true,
//     },
//   },
// };

@Injectable()
export class EventTypeService {
  constructor(private prisma: PrismaService) {}

  async create(data: EventTypeDTO): Promise<EventTypeDTO> {
    return this.prisma.eventType
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate eventType name');
          }
        }
        throw error;
      });

    // const eventTypeExists = await this.prisma.eventType.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (eventTypeExists) {
    //   throw new Error('EventType already exists');
    // }

    // const eventType = await this.prisma.eventType.create({
    //   data,
    // });

    // return eventType;
  }

  async findAll() {
    return this.prisma.eventType.findMany();
    // return `This action returns all eventType`;
  }

  async findOneById(id: string) {
    // return this.prisma.eventType
    //   .findUnique({
    //     where: {
    //       id,
    //     },
    //   })
    //   .catch((error) => {
    //     if (error instanceof PrismaClientKnownRequestError) {
    //       if (error.code === 'P2001') {
    //         throw new ForbiddenException('EventType does not exist');
    //       }
    //     }
    //     throw error;
    //   });

    const eventTypeExists = await this.prisma.eventType.findUnique({
      where: {
        id,
      },
    });

    if (!eventTypeExists) {
      throw new Error('EventType does not exist!');
    }

    return eventTypeExists;
  }

  async update(id: string, data: EventTypeDTO) {
    return this.prisma.eventType
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('EventType does not exist');
          }
        }
        throw error;
      });
  }

  async remove(id: string) {
    return this.prisma.eventType
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('EventType does not exist');
          }
        }
        throw error;
      });

    // const eventTypeExists = await this.prisma.eventType.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!eventTypeExists) {
    //   throw new Error('EventType does not exist!');
    // }

    // return await this.prisma.eventType.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
