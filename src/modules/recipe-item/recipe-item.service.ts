import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { RecipeItemDTO } from './dto/recipe-item.dto';

const selectAllFieldsWithItemNameAndCategory = {
  Item: {
    select: {
      name: true,
      stock: true,
      unity: true,
      value: true,
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  Recipe: {
    select: {
      name: true,
      description: true,
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
  }

  async findAll() {
    return this.prisma.recipeItem.findMany({
      include: selectAllFieldsWithItemNameAndCategory,
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
      include: selectAllFieldsWithItemNameAndCategory,
    });

    if (!recipeItemExists) {
      throw new Error('RecipeItem does not exist!');
    }

    return recipeItemExists;
  }

  // async findManyByName(name: string) {
  //   return await this.prisma.recipeItem
  //     .findMany({
  //       where: {
  //         name: {
  //           contains: name,
  //         },
  //       },
  //     })
  //     .catch((error) => {
  //       if (error instanceof PrismaClientKnownRequestError) {
  //         if (error.code === 'P2001') {
  //           throw new ForbiddenException('RecipeItem does not exist');
  //         }
  //       }
  //       throw error;
  //     });
  // }

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
