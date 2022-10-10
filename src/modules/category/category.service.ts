import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { CategoryDTO } from './dto/category.dto';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDTO): Promise<CategoryDTO> {
    return this.prisma.category
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate category name');
          }
        }
        throw error;
      });

    // const categoryExists = await this.prisma.category.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (categoryExists) {
    //   throw new Error('Category already exists');
    // }

    // const category = await this.prisma.category.create({
    //   data,
    // });

    // return category;
  }

  async findAll() {
    return this.prisma.category.findMany();
    // return `This action returns all category`;
  }

  async findOneById(id: string) {
    // return this.prisma.category
    //   .findUnique({
    //     where: {
    //       id,
    //     },
    //   })
    //   .catch((error) => {
    //     if (error instanceof PrismaClientKnownRequestError) {
    //       if (error.code === 'P2001') {
    //         throw new ForbiddenException('Category does not exist');
    //       }
    //     }
    //     throw error;
    //   });

    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!categoryExists) {
      throw new Error('Category does not exist!');
    }

    return categoryExists;
  }

  async findOneByName(name: string) {
    return await this.prisma.category
      .findUnique({
        where: {
          name,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Category does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: CategoryDTO) {
    console.log(data);
    return this.prisma.category
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Category does not exist');
          }
        }
        throw error;
      });

    // const categoryExists = await this.prisma.category.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!categoryExists) {
    //   throw new Error('Category does not exist!');
    // }

    // return this.prisma.category.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.category
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Category does not exist');
          }
        }
        throw error;
      });

    // const categoryExists = await this.prisma.category.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!categoryExists) {
    //   throw new Error('Category does not exist!');
    // }

    // return await this.prisma.category.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
