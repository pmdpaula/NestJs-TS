import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { ClientDTO } from './dto/client.dto';
// import { CreateClientDto } from './dto/create-client.dto';
// import { UpdateClientDto } from './dto/update-client.dto';

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
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(data: ClientDTO): Promise<ClientDTO> {
    return this.prisma.client
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate client');
          }
        }
        throw error;
      });

    // const clientExists = await this.prisma.client.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (clientExists) {
    //   throw new Error('Client already exists');
    // }

    // const client = await this.prisma.client.create({
    //   data,
    // });

    // return client;
  }

  async findAll() {
    return this.prisma.client.findMany();
    // return `This action returns all client`;
  }

  async findOneById(id: string) {
    // return this.prisma.client
    //   .findUnique({
    //     where: {
    //       id,
    //     },
    //   })
    //   .catch((error) => {
    //     if (error instanceof PrismaClientKnownRequestError) {
    //       if (error.code === 'P2001') {
    //         throw new ForbiddenException('Client does not exist');
    //       }
    //     }
    //     throw error;
    //   });

    const clientExists = await this.prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        client: {
          select: {
            firstName: true,
            surname: true,
            eventPlanner: true,
          },
        },
      },
    });

    if (!clientExists) {
      throw new Error('Client does not exist!');
    }

    return clientExists;
  }

  async findByName(name: string) {
    return await this.prisma.client
      .findMany({
        where: {
          OR: [
            { firstName: { contains: name, mode: 'insensitive' } },
            { surname: { contains: name, mode: 'insensitive' } },
          ],
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Client does not exist');
          }
        }
        throw error;
      });
  }

  async findByPlannerEventId(clientId: string) {
    return await this.prisma.client
      .findMany({
        where: {
          clientId,
        },
        // include: {
        //   Client: {
        //     select: {
        //       firstName: true,
        //       cellphone1: true,
        //       relationId: true,
        //     },
        //   },
        // },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Client does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: ClientDTO) {
    return this.prisma.client
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Client does not exist');
          }
        }
        throw error;
      });

    // const clientExists = await this.prisma.client.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!clientExists) {
    //   throw new Error('Client does not exist!');
    // }

    // return this.prisma.client.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.client
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Client does not exist');
          }
        }
        throw error;
      });

    // const clientExists = await this.prisma.client.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!clientExists) {
    //   throw new Error('Client does not exist!');
    // }

    // return await this.prisma.client.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
