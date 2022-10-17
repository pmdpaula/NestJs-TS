import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { clientsData } from '../../../test/data';
// import { categoryTests } from '../category/category.service.spec';
// import { PrismaService } from 'src/database/prisma.service';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';

export const clientTests = () => {
  describe('ClientService', () => {
    // let prisma: PrismaService;
    let clientService: ClientService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      // prisma = moduleRef.get<PrismaService>(PrismaService);
      clientService = moduleRef.get<ClientService>(ClientService);

      // await prisma.cleanDatabase();
    });

    describe('Create Client', () => {
      // Teste de criação de categoria
      clientsData.map((clientData) => {
        it('should create client', async () => {
          const client = await clientService.create(clientData);
          expect(client.firstName).toBe(clientData.firstName);
        });
      });

      // Teste de erro criação de categoria duplicada
      it('shoud thorw on duplicate client name', async () => {
        await clientService
          .create(clientsData[0])
          .then((client) => expect(client).toBeUndefined())
          .catch((error) => expect(error.status).toBe(403));
      });
    });

    describe('Find clients', () => {
      // Teste de listagem de todas as categorias
      it('should return a value 9 from lenght of client array', async () => {
        try {
          const client = await clientService.findAll();
          expect(client.length).toBe(9);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de client buscado pelo id
      it('should return a client found by id', async () => {
        try {
          const client = await clientService.findOneById(clientsData[0].id);
          expect(client.firstName).toBe(clientsData[0].firstName);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de clientes ligados a um cerimonialista
      it('should return a client found by event planner id', async () => {
        try {
          const client = await clientService.findByPlannerEventId(
            clientsData[2].id,
          );
          expect(client.length).toBe(2);
        } catch (error) {
          throw error;
        }
      });

      // Teste de listagem de client buscado por um texto no nome
      it('should return a client found by string in name', async () => {
        try {
          const client = await clientService.findByName('siqueira');
          expect(client.length).toBe(4);
        } catch (error) {
          throw error;
        }
      });
    });

    // Teste de alteração no nome de categoria
    describe('Update Client', () => {
      const newClient: ClientDTO = {
        firstName: 'Mariana',
        eventPlanner: true,
        country: 'EUA',
        description: 'Cermonialista',
      };

      it('should change client first name', async () => {
        try {
          const client = await clientService.update(
            clientsData[2].id,
            newClient,
          );
          expect(client.firstName).toBe(newClient.firstName);
        } catch (error) {
          throw error;
        }
      });
    });

    describe('Remove Client', () => {
      // Teste de remoção de categoria
      it('should remove a client and the final length will be initial minus 1', async () => {
        try {
          const clientInitial = await clientService.findAll();
          const initialLength = clientInitial.length;

          await clientService.remove(clientsData[4].id);

          const clientFinal = await clientService.findAll();
          const finalLength = clientFinal.length;
          expect(finalLength).toBe(initialLength - 1);
        } catch (error) {
          throw error;
        }
      });
    });
  });
};

// categoryTests();
// clientTests();
