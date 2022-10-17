import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectDTO } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() data: ProjectDTO) {
    return this.projectService.create(data);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/active')
  findActive() {
    return this.projectService.findActive();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.projectService.findOneById(id);
  }

  @Get('/search/:text')
  findByName(@Param('name') text: string) {
    return this.projectService.findByText(text);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ProjectDTO) {
    return this.projectService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
