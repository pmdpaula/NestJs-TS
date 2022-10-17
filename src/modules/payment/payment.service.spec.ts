import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PaymentService } from './payment.service';
import { paymentsData } from '../../../test/data';
import { PaymentDTO } from './dto/payment.dto';
import { categoryTests } from '../category/category.service.spec';
import { itemTests } from '../item/item.service.spec';
import { recipeItemTests } from '../recipe-item/recipe-item.service.spec';
import { recipeTests } from '../recipe/recipe.service.spec';
import { eventTypeTests } from '../event-type/event-type.service.spec';
import { clientTests } from '../client/client.service.spec';
import { projectTests } from '../project/project.service.spec';

export const paymentTests = () => {
  describe('PaymentService', () => {
    let paymentService: PaymentService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      paymentService = moduleRef.get<PaymentService>(PaymentService);
    });

    describe('Create Payment', () => {
      paymentsData.map((paymentData) => {
        // Teste de criação de item de receita
        it('Shoud create payment', async () => {
          const payment = await paymentService.create(paymentData);
          expect(payment.value).toBe(paymentData.value);
        });
      });

      // Teste de erro criação de receita duplicada
      it('shoud thorw on duplicate payment name', async () => {
        await paymentService
          .create(paymentsData[0])
          .then((payment) => expect(payment).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find payments', () => {
      // Teste de listagem de todos os pagamentos
      it('Should return same quatity of records inserted before.', async () => {
        try {
          const payment = await paymentService.findAll();
          expect(payment.length).toBe(paymentsData.length);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de todas os pagamentos de um projeto
      it('Should return all payments from a project.', async () => {
        try {
          const payment = await paymentService.findByProjectId(
            paymentsData[0].projectId,
          );
          expect(payment.length).toBe(3);
        } catch (error) {
          throw error;
        }
      });
    });

    // Teste de alteração no nome de item de receita
    describe('Update Payment', () => {
      const newPayment: PaymentDTO = {
        value: 250,
        paymentDate: new Date(2022, 0, 3),
        projectId: '01dddddda8eda77777666aaa',
      };

      it('Should change payment name', async () => {
        try {
          const payment = await paymentService.update(
            paymentsData[0].id,
            newPayment,
          );
          expect(payment.value).toBe(newPayment.value);
        } catch (error) {
          throw error;
        }
      });
    });

    describe('Remove Payment', () => {
      // Teste de remoção de item de receita
      it('should remove a payment and the final length will be initial minus 1', async () => {
        try {
          const paymentInitial = await paymentService.findAll();
          const initialLength = paymentInitial.length;

          await paymentService.remove(paymentsData[5].id);

          const paymentFinal = await paymentService.findAll();
          const finalLength = paymentFinal.length;

          // const finalLength = paymentFinal;
          expect(finalLength).toBe(initialLength - 1);
        } catch (error) {
          throw error;
        }
      });
    });
  });
};

categoryTests();
itemTests();
recipeItemTests();
recipeTests();
clientTests();
eventTypeTests();
projectTests();
paymentTests();
