import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { RecipeItemService } from './recipe-item.service';
import { recipeItemsData } from '../../../test/data';
// import { categoryTests } from '../category/category.service.spec';
// import { itemTests } from '../item/item.service.spec';

export const recipeItemTests = () => {
  describe('RecipeItemService', () => {
    let recipeItemService: RecipeItemService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      recipeItemService = moduleRef.get<RecipeItemService>(RecipeItemService);
    });

    describe('Create RecipeItem', () => {
      recipeItemsData.map((recipeItemData) => {
        // Teste de criação de item de receita
        it('shoud create recipeItem', async () => {
          const recipeItem = await recipeItemService.create(recipeItemData);
          expect(recipeItem.itemId).toBe(recipeItemData.itemId);
        });
      });

      // Teste de erro criação de item de receita duplicada
      it('shoud thorw on duplicate recipeItem name', async () => {
        await recipeItemService
          .create(recipeItemsData[0])
          .then((recipeItem) => expect(recipeItem).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find recipe items', () => {
      // Teste de listagem de todas os item de receitas
      it('should return a value 2 from lenght of recipeItem array', async () => {
        try {
          const recipeItem = await recipeItemService.findAll();
          expect(recipeItem.length).toBe(recipeItemsData.length);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de item de receita buscada pelo id
      it('should return a recipeItem found by id', async () => {
        try {
          const recipeItem = await recipeItemService.findOneById(
            recipeItemsData[0].id,
          );
          expect(recipeItem.itemId).toBe(recipeItemsData[0].itemId);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de item de receita buscada pelo nome
      // it('should return some recipe items found by name', async () => {
      //   try {
      //     const recipeItem = await recipeItemService.findManyByName('Farinha');
      //     // expect(recipeItem[0].id).toBe(recipeItemData.id);
      //     expect(recipeItem.length).toBe(2);
      //   } catch (error) {
      //     throw error;
      //   }
      // });

      // Teste de listagem de item de receita buscada pelo id da categoria
      // it('should return 1 recipe item found by category id', async () => {
      //   try {
      //     const recipeItem = await recipeItemService.findManyByCategoryId(
      //       categoriesData[1].id,
      //     );
      //     expect(recipeItem.length).toBe(1);
      //   } catch (error) {
      //     throw error;
      //   }
      // });
    });

    // Teste de alteração no nome de item de receita
    describe('Update RecipeItem', () => {
      const newRecipeItem = {
        itemId: '6342d4135a8eda65947f100a',
        quantity: 1.5,
      };

      it('should change recipeItem quantity', async () => {
        try {
          const recipeItem = await recipeItemService.update(
            recipeItemsData[2].id,
            newRecipeItem,
          );
          expect(recipeItem.quantity).toBe(newRecipeItem.quantity);
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

          await recipeItemService.remove(recipeItemsData[7].id);

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
};

// categoryTests();
// itemTests();
// recipeItemTests();
