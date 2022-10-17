import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ProjectService } from './project.service';
import { projectsData } from '../../../test/data';
import { ProjectDTO } from './dto/project.dto';
// import { categoryTests } from '../category/category.service.spec';
// import { itemTests } from '../item/item.service.spec';
// import { recipeItemTests } from '../recipe-item/recipe-item.service.spec';
// import { recipeTests } from '../recipe/recipe.service.spec';
// import { eventTypeTests } from '../event-type/event-type.service.spec';
// import { clientTests } from '../client/client.service.spec';

export const projectTests = () => {
  describe('ProjectService', () => {
    let projectService: ProjectService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      projectService = moduleRef.get<ProjectService>(ProjectService);
    });

    describe('Create Project', () => {
      projectsData.map((projectData) => {
        // Teste de criação de item de receita
        it('Shoud create project', async () => {
          const project = await projectService.create(projectData);
          expect(project.name).toBe(projectData.name);
        });
      });

      // Teste de erro criação de receita duplicada
      it('shoud thorw on duplicate project name', async () => {
        await projectService
          .create(projectsData[0])
          .then((project) => expect(project).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find project items', () => {
      // Teste de listagem de todos os projetos
      it('Should return same quatity of records inserted before.', async () => {
        try {
          const project = await projectService.findAll();
          expect(project.length).toBe(projectsData.length);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de todas os projetos ativos
      it('Should return all active projects.', async () => {
        try {
          const project = await projectService.findActive();
          expect(project.length).toBe(3);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de projeto buscado pelo id
      it('Should return a project found by id', async () => {
        try {
          const project = await projectService.findOneById(projectsData[1].id);
          expect(project.name).toBe(projectsData[1].name);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de projetos buscado por um texto
      it('should return some project items found by name', async () => {
        try {
          const project = await projectService.findByText('niver');
          expect(project.length).toBe(2);
        } catch (error) {
          throw error;
        }
      });

      //   // Teste de listagem de item de receita buscada pelo id da categoria
      //   it('should return 1 project item found by category id', async () => {
      //     try {
      //       const project = await projectService.findManyByCategoryId(
      //         categoriesData[1].id,
      //       );
      //       expect(project.length).toBe(1);
      //     } catch (error) {
      //       throw error;
      //     }
      //   });
    });

    // Teste de alteração no nome de item de receita
    describe('Update Project', () => {
      const newProject: ProjectDTO = {
        name: 'Aniversário Irene',
        isActive: false,
        soldValue: 450,
        deliveryData: new Date(2022, 4, 2),
        deliveryMode: 'próprio',
        description: 'Aniversário Mamãe Querida',
        eventTypeId: '02dd2d2da8eda65947666aaa',
        clientId: '01aaaa22aacdcd111111aaab',
      };

      it('Should change project name', async () => {
        try {
          const project = await projectService.update(
            projectsData[0].id,
            newProject,
          );
          expect(project.name).toBe(newProject.name);
        } catch (error) {
          throw error;
        }
      });
    });

    describe('Remove Project', () => {
      // Teste de remoção de item de receita
      it('should remove a project and the final length will be initial minus 1', async () => {
        try {
          const projectInitial = await projectService.findAll();
          const initialLength = projectInitial.length;

          await projectService.remove(projectsData[3].id);

          const projectFinal = await projectService.findAll();
          const finalLength = projectFinal.length;

          // const finalLength = projectFinal;
          expect(finalLength).toBe(initialLength - 1);
        } catch (error) {
          throw error;
        }
      });
    });
  });
};

// categoryTests();
// itemTests();
// recipeItemTests();
// recipeTests();
// clientTests();
// eventTypeTests();
// projectTests();
