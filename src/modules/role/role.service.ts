import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { RoleDTO } from './dto/role.dto';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(data: RoleDTO): Promise<RoleDTO> {
    return this.prisma.role
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate role name');
          }
        }
        throw error;
      });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOneById(id: string) {
    const roleExists = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!roleExists) {
      throw new Error('Role does not exist!');
    }

    return roleExists;
  }

  async findByName(name: string) {
    return await this.prisma.role
      .findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Role does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: RoleDTO) {
    return this.prisma.role
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Role does not exist');
          }
        }
        throw error;
      });
  }

  async remove(id: string) {
    return this.prisma.role
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Role does not exist');
          }
        }
        throw error;
      });
  }
}
