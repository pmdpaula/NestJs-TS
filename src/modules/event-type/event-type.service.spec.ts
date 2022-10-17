import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { EventTypeService } from './event-type.service';
import { eventTypesData } from '../../../test/data';
import { EventTypeDTO } from './dto/event-type.dto';
// import { categoryTests } from '../category/category.service.spec';
// import { itemTests } from '../item/item.service.spec';
// import { recipeItemTests } from '../recipe-item/recipe-item.service.spec';
// import { recipeTests } from '../recipe/recipe.service.spec';

export const eventTypeTests = () => {
  describe('EventTypeService', () => {
    let eventTypeService: EventTypeService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      eventTypeService = moduleRef.get<EventTypeService>(EventTypeService);
    });

    describe('Create EventType', () => {
      eventTypesData.map((eventTypeData) => {
        // Teste de criação de item de receita
        it('Shoud create eventType', async () => {
          const eventType = await eventTypeService.create(eventTypeData);
          expect(eventType.name).toBe(eventTypeData.name);
        });
      });

      // Teste de erro criação de receita duplicada
      it('shoud thorw on duplicate eventType name', async () => {
        await eventTypeService
          .create(eventTypesData[0])
          .then((eventType) => expect(eventType).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find eventType items', () => {
      // Teste de listagem de todas os item de receitas
      it('Should return same quatity of records inserted before.', async () => {
        try {
          const eventType = await eventTypeService.findAll();
          expect(eventType.length).toBe(eventTypesData.length);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de receita buscada pelo id
      it('Should return a eventType found by id', async () => {
        try {
          const eventType = await eventTypeService.findOneById(
            eventTypesData[1].id,
          );
          expect(eventType.name).toBe(eventTypesData[1].name);
        } catch (error) {
          throw error;
        }
      });
    });

    // Teste de alteração no nome de item de receita
    describe('Update EventType', () => {
      const newEventType: EventTypeDTO = {
        name: 'Casamento',
      };

      it('should change eventType name', async () => {
        try {
          const eventType = await eventTypeService.update(
            eventTypesData[0].id,
            newEventType,
          );
          expect(eventType.name).toBe(newEventType.name);
        } catch (error) {
          throw error;
        }
      });
    });

    describe('Remove EventType', () => {
      // Teste de remoção de item de receita
      it('should remove a eventType and the final length will be initial minus 1', async () => {
        try {
          const eventTypeInitial = await eventTypeService.findAll();
          const initialLength = eventTypeInitial.length;

          await eventTypeService.remove(eventTypesData[5].id);

          const eventTypeFinal = await eventTypeService.findAll();
          const finalLength = eventTypeFinal.length;

          // const finalLength = eventTypeFinal;
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
// eventTypeTests();
