import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { RecipeItemDTO } from './dto/recipe-item.dto';

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
export class RecipeItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: RecipeItemDTO): Promise<RecipeItemDTO> {
    // console.log(data);

    return this.prisma.recipeItem
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate recipe item name');
          }
        }
        throw error;
      });

    // const recipeItemExists = await this.prisma.recipeItem.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (recipeItemExists) {
    //   throw new Error('RecipeItem already exists');
    // }

    // const recipeItem = await this.prisma.recipeItem.create({
    //   data,
    // });

    // return recipeItem;
  }

  async findAll() {
    return this.prisma.recipeItem.findMany({
      select: selectAllFieldsWithCategoryName,
    });
  }

  async findAllInStock() {
    return this.prisma.recipeItem.findMany({
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
    // return this.prisma.recipeItem
    //   .findUnique({
    //     where: {
    //       id,
    //     },
    //   })
    //   .catch((error) => {
    //     if (error instanceof PrismaClientKnownRequestError) {
    //       if (error.code === 'P2001') {
    //         throw new ForbiddenException('RecipeItem does not exist');
    //       }
    //     }
    //     throw error;
    //   });

    const recipeItemExists = await this.prisma.recipeItem.findUnique({
      where: {
        id,
      },
    });

    if (!recipeItemExists) {
      throw new Error('RecipeItem does not exist!');
    }

    return recipeItemExists;
  }

  async findManyByName(name: string) {
    return await this.prisma.recipeItem
      .findMany({
        where: {
          name: {
            contains: name,
          },
        },
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

  async findManyByCategoryId(categoryId: string) {
    return await this.prisma.recipeItem
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

  async update(id: string, data: RecipeItemDTO) {
    return this.prisma.recipeItem
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Recipe item does not exist');
          }
        }
        throw error;
      });

    // const recipeItemExists = await this.prisma.recipeItem.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!recipeItemExists) {
    //   throw new Error('RecipeItem does not exist!');
    // }

    // return this.prisma.recipeItem.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.recipeItem
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Recipe item does not exist');
          }
        }
        throw error;
      });

    // const recipeItemExists = await this.prisma.recipeItem.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!recipeItemExists) {
    //   throw new Error('RecipeItem does not exist!');
    // }

    // return await this.prisma.recipeItem.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
