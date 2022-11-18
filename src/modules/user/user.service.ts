import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
// import { Prisma } from '@prisma/client';

// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // async create(dataUser: CreateUserDto): Promise<UserDTO> {
  async create(dataUser: UserDTO): Promise<UserDTO> {
    const guestRole = await this.prisma.role.findMany({
      where: {
        name: {
          equals: 'guest',
          mode: 'insensitive',
        },
      },
    });

    const data: UserDTO = {
      ...dataUser,
      // role: [guestRole[0].id],
      password: await bcrypt.hash(dataUser.password, 10),
    };
    // const data: Prisma.UserCreateInput = {
    //   ...dataUser,
    //   password: await bcrypt.hash(dataUser.password, 10),
    // };

    const createdUser = await this.prisma.user
      .create({
        data: {
          ...data,
          role: {
            connect: {
              id: guestRole[0].id,
            },
          },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate user name');
          }
        }
        throw error;
      });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist!');
    }

    return userExists;
  }

  // async findByUsername(username: string) {
  //   return await this.prisma.user
  //     .findUnique({
  //       where: {
  //         username,
  //       },
  //     })
  //     .catch((error) => {
  //       if (error instanceof PrismaClientKnownRequestError) {
  //         if (error.code === 'P2001') {
  //           throw new ForbiddenException('User does not exist');
  //         }
  //       }
  //       throw error;
  //     });
  // }

  async findByEmail(email: string): Promise<UserDTO> {
    return await this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('User does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: UserDTO) {
    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('User does not exist');
          }
        }
        throw error;
      });
  }

  async remove(id: string) {
    return this.prisma.user
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('User does not exist');
          }
        }
        throw error;
      });
  }
}
