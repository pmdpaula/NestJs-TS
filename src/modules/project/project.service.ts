import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { ProjectDTO } from './dto/project.dto';
// import { CreateProjectDto } from './dto/create-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';

const selectAllInfo = {
  EventType: {
    select: {
      name: true,
    },
  },
  Client: {
    select: {
      firstName: true,
      surname: true,
      cellphone1: true,
      cellphone2: true,
      address: true,
      city: true,
      country: true,
      description: true,
      eventPlanner: true,
      RelationalClient: {
        select: {
          firstName: true,
          surname: true,
          cellphone1: true,
          cellphone2: true,
        },
      },
    },
  },
  EventPlanner: {
    select: {
      firstName: true,
      surname: true,
      cellphone1: true,
      cellphone2: true,
    },
  },
  Recipe: {
    select: {
      name: true,
      description: true,
      creationDate: true,
      lastModificationDate: true,
    },
  },
};

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProjectDTO): Promise<ProjectDTO> {
    return this.prisma.project
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate project name');
          }
        }
        throw error;
      });

    // const projectExists = await this.prisma.project.findFirst({
    //   where: {
    //     name: data.name,
    //   },
    // });

    // if (projectExists) {
    //   throw new Error('Project already exists');
    // }

    // const project = await this.prisma.project.create({
    //   data,
    // });

    // return project;
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: selectAllInfo,
    });
  }

  async findActive() {
    return await this.prisma.project
      .findMany({
        where: {
          isActive: true,
        },
        include: selectAllInfo,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Project does not exist');
          }
        }
        throw error;
      });
  }

  async findOneById(id: string) {
    const projectExists = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: selectAllInfo,
    });

    if (!projectExists) {
      throw new Error('Project does not exist!');
    }

    return projectExists;
  }

  async findByText(text: string) {
    return await this.prisma.project
      .findMany({
        where: {
          OR: [
            { name: { contains: text, mode: 'insensitive' } },
            { description: { contains: text, mode: 'insensitive' } },
          ],
        },
        include: selectAllInfo,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Project does not exist');
          }
        }
        throw error;
      });
  }

  async update(id: string, data: ProjectDTO) {
    return this.prisma.project
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Project does not exist');
          }
        }
        throw error;
      });

    // const projectExists = await this.prisma.project.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!projectExists) {
    //   throw new Error('Project does not exist!');
    // }

    // return this.prisma.project.update({
    //   data,
    //   where: {
    //     id,
    //   },
    // });
  }

  async remove(id: string) {
    return this.prisma.project
      .delete({
        where: { id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new ForbiddenException('Project does not exist');
          }
        }
        throw error;
      });

    // const projectExists = await this.prisma.project.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!projectExists) {
    //   throw new Error('Project does not exist!');
    // }

    // return await this.prisma.project.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}
