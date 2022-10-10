import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/database/prisma.service';
import { RecipeItemService } from './recipe-item.service';
import { RecipeItemDTO } from './dto/recipe-item.dto';
import { CategoryDTO } from '../category/dto/category.dto';
import { CategoryService } from '../category/category.service';

describe('RecipeItemService', () => {
  let prisma: PrismaService;
  let recipeItemService: RecipeItemService;
  let categoryService: CategoryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    recipeItemService = moduleRef.get<RecipeItemService>(RecipeItemService);
    categoryService = moduleRef.get<CategoryService>(CategoryService);

    await prisma.cleanDatabase();
  });

  const categoryData: CategoryDTO = {
    id: '6342c7c0f5d0cf9c8c6fc643',
    name: 'Farinha de Trigo',
  };

  const categoriesData: CategoryDTO[] = [
    categoryData,
    {
      id: '6342c7c0f5d0cf9c8c6fa100',
      name: 'Leite',
    },
    {
      id: 'aaaac7c0f5d0cf9c8c6fa300',
      name: 'Leite Condensado',
    },
  ];

  const recipeItemData: RecipeItemDTO = {
    id: '6342d4135a8eda65947c672b',
    name: 'Farinha Dona Benta',
    categoryId: categoryData.id,
    value: 12.2,
    boughtDate: new Date(2022, 7, 12),
    stock: true,
  };

  const recipesItemData: RecipeItemDTO[] = [
    recipeItemData,
    {
      id: '6342d4135a8eda65947c500a',
      name: 'Farinha Dona maria',
      categoryId: categoryData.id,
      value: 10.99,
      boughtDate: new Date(2022, 7, 20),
      stock: true,
    },
    {
      id: '6342d4135a8eda65947f100a',
      name: 'Leite Italac',
      categoryId: '6342c7c0f5d0cf9c8c6fa100',
      value: 7.1,
      boughtDate: new Date(2022, 8, 15),
      stock: true,
    },
    {
      id: 'aaaaa4135a8eda65947a100a',
      name: 'Leite Condensado Elegê',
      categoryId: 'aaaac7c0f5d0cf9c8c6fa300',
      value: 3.54,
      boughtDate: new Date(2021, 8, 1),
      stock: false,
    },
  ];

  describe('Create RecipeItem', () => {
    categoriesData.map((categoryData) => {
      it('should create category', async () => {
        const category = await categoryService.create(categoryData);
        expect(category.name).toBe(categoryData.name);
      });
    });

    recipesItemData.map((recipeItemData) => {
      // Teste de criação de item de receita
      it('shoud create recipeItem', async () => {
        const recipeItem = await recipeItemService.create(recipeItemData);
        expect(recipeItem.name).toBe(recipeItemData.name);
      });
    });

    // Teste de erro criação de item de receita duplicada
    it('shoud thorw on duplicate recipeItem name', async () => {
      await recipeItemService
        .create(recipeItemData)
        .then((recipeItem) => expect(recipeItem).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });
  });

  describe('Find recipe items', () => {
    // Teste de listagem de todas os item de receitas
    it('should return a value 2 from lenght of recipeItem array', async () => {
      try {
        const recipeItem = await recipeItemService.findAll();
        expect(recipeItem.length).toBe(recipesItemData.length);
      } catch (error) {
        throw error;
      }
    });

    // Teste de listagem de item de receita buscada pelo id
    it('should return a recipeItem found by id', async () => {
      try {
        const recipeItem = await recipeItemService.findOneById(
          recipeItemData.id,
        );
        expect(recipeItem.name).toBe(recipeItemData.name);
      } catch (error) {
        throw error;
      }
    });

    // Teste de listagem de item de receita buscada pelo nome
    it('should return some recipe items found by name', async () => {
      try {
        const recipeItem = await recipeItemService.findManyByName('Farinha');
        // expect(recipeItem[0].id).toBe(recipeItemData.id);
        expect(recipeItem.length).toBe(2);
      } catch (error) {
        throw error;
      }
    });

    // Teste de listagem de item de receita buscada pelo id da categoria
    it('should return 1 recipe item found by category id', async () => {
      try {
        const recipeItem = await recipeItemService.findManyByCategoryId(
          categoriesData[1].id,
        );
        expect(recipeItem.length).toBe(1);
      } catch (error) {
        throw error;
      }
    });
  });

  // Teste de alteração no nome de item de receita
  describe('Update RecipeItem', () => {
    const newRecipeItem = {
      name: 'Farinha Dona Maria',
      value: 6.5,
      categoryId: '6342c7c0f5d0cf9c8c6fc643',
      boughtDate: new Date('2022-08-20T03:00:00.000Z'),
      stock: true,
    };

    it('should change recipeItem name', async () => {
      try {
        const recipeItem = await recipeItemService.update(
          recipesItemData[1].id,
          newRecipeItem,
        );
        expect(recipeItem.name).toBe(newRecipeItem.name);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('Remove RecipeItem', () => {
    // Teste de remoção de item de receita
    it('should remove a recipeItem and the final length will be initial minus 1', async () => {
      try {
        const recipeItemInitial = await recipeItemService.findAll();
        const initialLength = recipeItemInitial.length;

        await recipeItemService.remove('6342d4135a8eda65947c500a');

        const recipeItemFinal = await recipeItemService.findAll();
        const finalLength = recipeItemFinal.length;

        // const finalLength = recipeItemFinal;
        expect(finalLength).toBe(initialLength - 1);
      } catch (error) {
        throw error;
      }
    });
  });
});
