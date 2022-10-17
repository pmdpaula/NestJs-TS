import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { categoriesData, itemsData } from '../../../test/data';
// import { categoryTests } from '../category/category.service.spec';
import { ItemService } from './item.service';

export const itemTests = () => {
  describe('ItemService', () => {
    // let prisma: PrismaService;
    let itemService: ItemService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      // prisma = moduleRef.get<PrismaService>(PrismaService);
      itemService = moduleRef.get<ItemService>(ItemService);

      // await prisma.cleanDatabase();
    });

    describe('Create Item', () => {
      // Teste de criação de categoria
      itemsData.map((itemData) => {
        it('should create item', async () => {
          const item = await itemService.create(itemData);
          expect(item.name).toBe(itemData.name);
        });
      });

      // Teste de erro criação de categoria duplicada
      it('shoud thorw on duplicate item name', async () => {
        await itemService
          .create(itemsData[0])
          .then((item) => expect(item).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find items', () => {
      // Teste de listagem de todas as categorias
      it('should return a value 9 from lenght of item array', async () => {
        try {
          const item = await itemService.findAll();
          expect(item.length).toBe(9);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de item buscado pelo id
      it('should return a item found by id', async () => {
        try {
          const item = await itemService.findOneById(itemsData[0].id);
          expect(item.name).toBe(itemsData[0].name);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de item buscado por um texto no nome
      it('should return a item found by string in name', async () => {
        try {
          const item = await itemService.findByName('leite');
          expect(item.length).toBe(4);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de item buscado pelo id de uma categoria.
      it('should return a item found by string in name', async () => {
        try {
          const item = await itemService.findByName('leite');
          expect(item.length).toBe(4);
        } catch (error) {
          throw error;
        }
      });
    });

    // Teste de alteração no nome de categoria
    describe('Update Item', () => {
      const newItem = {
        name: 'Farinha Dona Maria',
        value: 6.5,
        quantity: 24,
        unity: 'kg',
        categoryId: categoriesData[0].id,
        boughtDate: new Date('2022-08-20T03:00:00.000Z'),
        stock: true,
      };

      it('should change item name', async () => {
        try {
          const item = await itemService.update(itemsData[3].id, newItem);
          expect(item.name).toBe(newItem.name);
        } catch (error) {
          throw error;
        }
      });
    });

    describe('Remove Item', () => {
      // Teste de remoção de categoria
      it('should remove a item and the final length will be initial minus 1', async () => {
        try {
          const itemInitial = await itemService.findAll();
          const initialLength = itemInitial.length;

          await itemService.remove(itemsData[4].id);

          const itemFinal = await itemService.findAll();
          const finalLength = itemFinal.length;
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
