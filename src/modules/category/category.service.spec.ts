import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

describe('CategoryService', () => {
  let prisma: PrismaService;
  let categoryService: CategoryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    categoryService = moduleRef.get<CategoryService>(CategoryService);

    await prisma.cleanDatabase();
  });

  const categoryData: CategoryDTO = {
    id: '6342c7c0f5d0cf9c8c6fc643',
    name: 'Primeira categoria',
  };

  describe('Create Category', () => {
    // Teste de criação de categoria
    it('should create category', async () => {
      const category = await categoryService.create(categoryData);
      expect(category.name).toBe(categoryData.name);
    });

    // Teste de erro criação de categoria duplicada
    it('shoud thorw on duplicate category name', async () => {
      await categoryService
        .create(categoryData)
        .then((category) => expect(category).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });
  });

  describe('Find categories', () => {
    // Teste de listagem de todas as categorias
    it('should return a value 1 from lenght of category array', async () => {
      try {
        const category = await categoryService.findAll();
        expect(category.length).toBe(1);
      } catch (error) {
        throw error;
      }
    });

    // Teste de listagem de categoria buscada pelo id
    it('should return a category found by id', async () => {
      try {
        const category = await categoryService.findOneById(categoryData.id);
        expect(category.name).toBe(categoryData.name);
      } catch (error) {
        throw error;
      }
    });

    // Teste de listagem de categoria buscada pelo id
    it('should return a category found by name', async () => {
      try {
        const category = await categoryService.findOneByName(categoryData.name);
        expect(category.id).toBe(categoryData.id);
      } catch (error) {
        throw error;
      }
    });
  });

  // Teste de alteração no nome de categoria
  describe('Update Category', () => {
    const newCategoryName = { name: 'Categoria Alterada' };

    it('should change category name', async () => {
      try {
        const category = await categoryService.update(
          categoryData.id,
          newCategoryName,
        );
        expect(category.name).toBe(newCategoryName.name);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('Remove Category', () => {
    // Teste de remoção de categoria
    it('should remove a category and the final length will be initial minus 1', async () => {
      try {
        const categoryInitial = await categoryService.findAll();
        const initialLength = categoryInitial.length;

        await categoryService.remove(categoryData.id);

        const categoryFinal = await categoryService.findAll();
        const finalLength = categoryFinal.length;
        expect(finalLength).toBe(initialLength - 1);
      } catch (error) {
        throw error;
      }
    });
  });
});