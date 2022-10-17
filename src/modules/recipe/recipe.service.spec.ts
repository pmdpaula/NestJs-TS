import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { RecipeService } from './recipe.service';
import { recipesData } from '../../../test/data';
// import { categoryTests } from '../category/category.service.spec';
// import { itemTests } from '../item/item.service.spec';
// import { recipeItemTests } from '../recipe-item/recipe-item.service.spec';
import { RecipeDTO } from './dto/recipe.dto';

export const recipeTests = () => {
  describe('RecipeService', () => {
    let recipeService: RecipeService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      recipeService = moduleRef.get<RecipeService>(RecipeService);
    });

    describe('Create Recipe', () => {
      recipesData.map((recipeData) => {
        // Teste de criação de item de receita
        it('Shoud create recipe', async () => {
          const recipe = await recipeService.create(recipeData);
          expect(recipe.name).toBe(recipeData.name);
        });
      });

      // Teste de erro criação de receita duplicada
      it('shoud thorw on duplicate recipe name', async () => {
        await recipeService
          .create(recipesData[0])
          .then((recipe) => expect(recipe).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find recipe items', () => {
      // Teste de listagem de todas os item de receitas
      it('Should return same quatity of records inserted before.', async () => {
        try {
          const recipe = await recipeService.findAll();
          expect(recipe.length).toBe(recipesData.length);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de receita buscada pelo id
      it('Should return a recipe found by id', async () => {
        try {
          const recipe = await recipeService.findOneById(recipesData[1].id);
          expect(recipe.name).toBe(recipesData[1].name);
        } catch (error) {
          throw error;
        }
      });

      //   // Teste de listagem de item de receita buscada pelo nome
      //   it('should return some recipe items found by name', async () => {
      //     try {
      //       const recipe = await recipeService.findManyByName('Farinha');
      //       // expect(recipe[0].id).toBe(recipeData.id);
      //       expect(recipe.length).toBe(2);
      //     } catch (error) {
      //       throw error;
      //     }
      //   });

      //   // Teste de listagem de item de receita buscada pelo id da categoria
      //   it('should return 1 recipe item found by category id', async () => {
      //     try {
      //       const recipe = await recipeService.findManyByCategoryId(
      //         categoriesData[1].id,
      //       );
      //       expect(recipe.length).toBe(1);
      //     } catch (error) {
      //       throw error;
      //     }
      //   });
    });

    // Teste de alteração no nome de item de receita
    describe('Update Recipe', () => {
      const newRecipe: RecipeDTO = {
        name: 'casa-160 butter cream',
        description:
          'casa-Carol-Diogo. Bolo com 160 fatias, 5 andares, feito de butter cream e com flores de açucar.',
        creationDate: new Date(2022, 7, 20),
        lastModificationDate: new Date(2022, 9, 17),
        // recipeItemId: ['bbb2d4135a8eda65947aaaaa', 'bbb2d4135a8eda65947aaaad'],
      };

      it('Should change recipe name', async () => {
        try {
          const recipe = await recipeService.update(
            recipesData[0].id,
            newRecipe,
          );
          expect(recipe.name).toBe(newRecipe.name);
        } catch (error) {
          throw error;
        }
      });
    });

    describe('Remove Recipe', () => {
      // Teste de remoção de item de receita
      it('should remove a recipe and the final length will be initial minus 1', async () => {
        try {
          const recipeInitial = await recipeService.findAll();
          const initialLength = recipeInitial.length;

          await recipeService.remove(recipesData[2].id);

          const recipeFinal = await recipeService.findAll();
          const finalLength = recipeFinal.length;

          // const finalLength = recipeFinal;
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
