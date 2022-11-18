import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { RecipeDTO } from './dto/recipe.dto';
// import { CreateRecipeDto } from './dto/create-recipe.dto';
// import { UpdateRecipeDto } from './dto/update-recipe.dto';

const selectAllInfo = {
  recipeItems: {
    select: {
      item: {
        select: {
          // id: true,
          name: true,
          boughtDate: true,
          // quantity: true,
          unity: true,
          value: true,
          category: {
            select: {
              name: true,
            },
          },
          // stock: true,
        },
      },
      observation: true,
      quantity: true,
    },
  },
};

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async create(data: RecipeDTO): Promise<RecipeDTO> {
    return this.prisma.recipe
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate recipe name');
          }
        }
        throw error;
      });

    // const recipeExists = await this.prisma.recipe.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (recipeExists) {
    //   throw new Error('Recipe already exists');
    // }

    // const recipe = await this.prisma.recipe.create({
    //   data,
    // });

    // return recipe;
  }

  async findAll() {
    return this.prisma.recipe.findMany({
      include: selectAllInfo,
    });
  }

  async findOneById(id: string) {
    const recipeExists = await this.prisma.recipe.findUnique({
      where: {
        id,
      },
      include: selectAllInfo,
    });

    if (!recipeExists) {
      throw new Error('Recipe does not exist!');
    }

    return recipeExists;
  }

  async findOneByName(name: string) {
    return await this.prisma.recipe
      .findMany({
        where: {
          name,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Recipe does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: RecipeDTO) {
    return this.prisma.recipe
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Recipe does not exist');
          }
        }
        throw error;
      });

    // const recipeExists = await this.prisma.recipe.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!recipeExists) {
    //   throw new Error('Recipe does not exist!');
    // }

    // return this.prisma.recipe.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.recipe
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Recipe does not exist');
          }
        }
        throw error;
      });

    // const recipeExists = await this.prisma.recipe.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!recipeExists) {
    //   throw new Error('Recipe does not exist!');
    // }

    // return await this.prisma.recipe.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
