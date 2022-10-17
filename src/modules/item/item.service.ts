import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { ItemDTO } from './dto/item.dto';
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';

const selectAllFieldsWithCategoryName = {
  id: true,
  name: true,
  value: true,
  boughtDate: true,
  stock: true,
  Category: {
    select: {
      id: true,
      name: true,
    },
  },
};

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: ItemDTO): Promise<ItemDTO> {
    return this.prisma.item
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate item name');
          }
        }
        throw error;
      });

    // const itemExists = await this.prisma.item.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (itemExists) {
    //   throw new Error('Item already exists');
    // }

    // const item = await this.prisma.item.create({
    //   data,
    // });

    // return item;
  }

  async findAll() {
    return this.prisma.item.findMany();
    // return `This action returns all item`;
  }

  async findAllInStock() {
    return this.prisma.item.findMany({
      where: {
        stock: true,
      },
      select: selectAllFieldsWithCategoryName,
      orderBy: [
        {
          Category: {
            name: 'desc',
          },
        },
        { boughtDate: 'desc' },
      ],
    });
  }

  async findOneById(id: string) {
    // return this.prisma.item
    //   .findUnique({
    //     where: {
    //       id,
    //     },
    //   })
    //   .catch((error) => {
    //     if (error instanceof PrismaClientKnownRequestError) {
    //       if (error.code === 'P2001') {
    //         throw new ForbiddenException('Item does not exist');
    //       }
    //     }
    //     throw error;
    //   });

    const itemExists = await this.prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!itemExists) {
      throw new Error('Item does not exist!');
    }

    return itemExists;
  }

  async findByName(name: string) {
    return await this.prisma.item
      .findMany({
        where: {
          name: { contains: name, mode: 'insensitive' },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Item does not exist');
          }
        }
        throw error;
      });
  }

  async findManyByCategoryId(categoryId: string) {
    return await this.prisma.item
      .findMany({
        where: {
          categoryId,
        },
        select: selectAllFieldsWithCategoryName,
        orderBy: [
          {
            Category: {
              name: 'desc',
            },
          },
          { boughtDate: 'desc' },
        ],
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('RecipeItem does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: ItemDTO) {
    return this.prisma.item
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Item does not exist');
          }
        }
        throw error;
      });

    // const itemExists = await this.prisma.item.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!itemExists) {
    //   throw new Error('Item does not exist!');
    // }

    // return this.prisma.item.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.item
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Item does not exist');
          }
        }
        throw error;
      });

    // const itemExists = await this.prisma.item.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!itemExists) {
    //   throw new Error('Item does not exist!');
    // }

    // return await this.prisma.item.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
