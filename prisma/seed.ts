import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Erase all data in the database
  await prisma.payment.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.eventType.deleteMany({});
  await prisma.recipe.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.recipeItem.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.category.deleteMany({});

  // populate Categories
  const categoriesData = await prisma.category.createMany({
    data: [
      {
        id: '6342c7c0f5d0cf9c8c6fc643',
        name: 'Farinha de Trigo',
      },
      {
        id: '6342c7c0f5d0cf9c8c6fa100',
        name: 'Leite',
      },
      {
        id: 'aaaac7c0f5d0cf9c8c6fa300',
        name: 'Leite Condensado',
      },
      {
        id: 'aaaabbbbbb00000011111aaa',
        name: 'Pasto Americano',
      },
      {
        id: 'aaaabbbbbb00000011111bbb',
        name: 'Cortador de Flor',
      },
      {
        id: 'aaaabbbbbb00000011111ccc',
        name: 'Creme de Leite',
      },
      {
        id: 'aaaabbbbbb00000011111ddd',
        name: 'Açucar',
      },
      {
        id: 'aaaabbbbbb00000022222aaa',
        name: 'Chocolate',
      },
    ],
  });

  // populate Items
  await prisma.item.createMany({
    data: [
      {
        id: '6342d4135a8eda65947c672b',
        name: 'Farinha Dona Benta',
        quantity: 24,
        unity: 'kg',
        categoryId: '6342c7c0f5d0cf9c8c6fc643',
        value: 12.2,
        boughtDate: new Date(2022, 7, 12),
        stock: true,
      },
      {
        id: '6342d4135a8eda65947c500a',
        name: 'Farinha seu mario',
        quantity: 24,
        unity: 'kg',
        categoryId: '6342c7c0f5d0cf9c8c6fc643',
        value: 10.99,
        boughtDate: new Date(2022, 7, 20),
        stock: true,
      },
      {
        id: '6342d4135a8eda65947f100a',
        name: 'Leite Italac',
        quantity: 5,
        unity: 'l',
        categoryId: '6342c7c0f5d0cf9c8c6fa100',
        value: 7.1,
        boughtDate: new Date(2022, 8, 15),
        stock: true,
      },
      {
        id: 'aaaaa4135a8eda65947a100a',
        name: 'Leite Condensado Elegê',
        quantity: 27,
        unity: 'caixa',
        categoryId: 'aaaac7c0f5d0cf9c8c6fa300',
        value: 3.54,
        boughtDate: new Date(2021, 8, 1),
        stock: false,
      },
      {
        id: 'aaaaa4135a8eda65947a100b',
        name: 'Leite Parmalat',
        quantity: 27,
        unity: 'caixa',
        categoryId: '6342c7c0f5d0cf9c8c6fa100',
        value: 3.54,
        boughtDate: new Date(2016, 8, 1),
        stock: false,
      },
      {
        id: 'aaaaa4135a8eda65947b100a',
        name: 'Creme de Leite Piracanjuba',
        quantity: 27,
        unity: 'caixa',
        categoryId: 'aaaabbbbbb00000011111ccc',
        value: 2.54,
        boughtDate: new Date(2022, 9, 10),
        stock: true,
      },
      {
        id: 'aaaaa4135a8eda65947b200a',
        name: 'Açucar Guarani',
        quantity: 10,
        unity: 'kg',
        categoryId: 'aaaabbbbbb00000011111ddd',
        value: 2.89,
        boughtDate: new Date(2022, 9, 10),
        stock: true,
      },
      {
        id: 'aaaaa4135a8eda65947c100a',
        name: 'Pasta Americana Fine Line',
        quantity: 6400,
        unity: 'g',
        categoryId: 'aaaabbbbbb00000011111aaa',
        value: 0.025125,
        boughtDate: new Date(2022, 9, 10),
        stock: true,
      },
      {
        id: 'aaaaa4135a8eda65947c100b',
        name: 'Pasta Americana PastaMix',
        quantity: 6400,
        unity: 'g',
        categoryId: 'aaaabbbbbb00000011111aaa',
        value: 0.025125,
        boughtDate: new Date(2022, 6, 20),
        stock: true,
      },
    ],
  });

  // populate RecipeItems
  await prisma.recipeItem.createMany({
    data: [
      {
        id: '00b2d4135a8eda65947aaaaa',
        itemId: '6342d4135a8eda65947c672b',
        quantity: 1,
      },
      {
        id: '01b2d4135a8eda65947aaaab',
        itemId: '6342d4135a8eda65947c500a',
        quantity: 1,
      },
      {
        id: '02b2d4135a8eda65947aaaac',
        itemId: '6342d4135a8eda65947f100a',
        quantity: 2,
      },
      {
        id: '03b2d4135a8eda65947aaaad',
        itemId: 'aaaaa4135a8eda65947a100a',
        quantity: 3,
      },
      {
        id: '04b2d4135a8eda65947aaaae',
        itemId: 'aaaaa4135a8eda65947c100b',
        quantity: 900,
      },
      {
        id: '05b2d4135a8eda65947aaaae',
        itemId: 'aaaaa4135a8eda65947b200a',
        quantity: 0.5,
      },
      {
        id: '06b2d4135a8eda65947aaaae',
        itemId: 'aaaaa4135a8eda65947a100a',
        quantity: 3,
      },
      {
        id: '07b2d4135a8eda65947aaaae',
        itemId: 'aaaaa4135a8eda65947a100a',
        quantity: 3,
      },
    ],
  });

  // populate Clients
  await prisma.client.createMany({
    data: [
      {
        id: '00aa2222aacdcd111111aaaa',
        firstName: 'Carol',
        surname: 'Siqueira',
        eventPlanner: false,
        city: 'Oakville',
        country: 'Canadá',
      },
      {
        id: '01aaaa22aacdcd111111aaab',
        firstName: 'Irene',
        surname: 'Siqueira',
        eventPlanner: false,
        city: 'Saquarema',
        country: 'Brasil',
      },
      {
        id: '02aaaaaaaa1111111111caaa',
        firstName: 'Mariana',
        eventPlanner: true,
        city: 'Miami',
        country: 'Brasil',
      },
      {
        id: '03aaaaaaaa1111111111aaac',
        firstName: 'Tati',
        surname: 'de Paula',
        eventPlanner: false,
        country: 'Canadá',
        clientId: '02aaaaaaaa1111111111caaa',
      },
      {
        id: '04aaaaaaaa1111111111aaad',
        firstName: 'Pedro',
        surname: 'de Paula',
        eventPlanner: false,
        country: 'Brasil',
      },
      {
        id: '05aaaaaaaa1111111111aaae',
        firstName: 'Rafael',
        surname: 'Siqueira',
        eventPlanner: false,
        city: 'Rio de Janeiro',
        country: 'Basil',
      },
      {
        id: '06aaaaaaaa1111111111caab',
        firstName: 'Amanda',
        eventPlanner: true,
        city: 'Niterói',
        country: 'Brasil',
      },
      {
        id: '07aaaaaaaa1111111111aaaf',
        firstName: 'Dedé',
        surname: 'Siqueira',
        eventPlanner: false,
        country: 'Brasil',
        clientId: '02aaaaaaaa1111111111caaa',
      },
      {
        id: '08aaaaaaaa1111111111aaa0',
        firstName: 'Rita',
        surname: 'Machado',
        eventPlanner: false,
        country: 'Portugal',
      },
    ],
  });

  // populate Recipes
  await prisma.recipe.createMany({
    data: [
      {
        id: '00dd2d2da8eda65947111aaa',
        name: 'casa-120 butter cream',
        description:
          'casa-Carol-Diogo. Bolo com 120 fatias, 4 andares, feito de butter cream e com flores de açucar.',
        creationDate: new Date(2022, 7, 21),
        recipeItemId: ['00b2d4135a8eda65947aaaaa', '03b2d4135a8eda65947aaaad'],
      },
      {
        id: '01dd2d2da8eda65947111aaa',
        name: 'médio 25 fatias butter cream',
        description:
          'Bolo médio 25 cm diâmetro; 30 fatias, 1 andares, feito de butter cream.',
        creationDate: new Date(2022, 9, 3),
        recipeItemId: [
          '00b2d4135a8eda65947aaaaa',
          '03b2d4135a8eda65947aaaad',
          '04b2d4135a8eda65947aaaae',
          '06b2d4135a8eda65947aaaae',
        ],
      },
      {
        id: '02dd2d2da8eda65947111aaa',
        name: 'mini 15 fatias butter cream',
        description:
          'Bolo médio 10 cm diâmetro; 15 fatias, 1 andares, feito de butter cream.',
        creationDate: new Date(2022, 4, 10),
        recipeItemId: ['00b2d4135a8eda65947aaaaa', '03b2d4135a8eda65947aaaad'],
      },
    ],
  });

  // populate EventTypes
  await prisma.eventType.createMany({
    data: [
      {
        id: '00dd2d2da8eda65947666aaa',
        name: 'Caramento',
      },
      {
        id: '01dd2d2da8eda65947666aaa',
        name: 'Bodas',
      },
      {
        id: '02dd2d2da8eda65947666aaa',
        name: 'Aniversário',
      },
      {
        id: '03dd2d2da8eda65947666aaa',
        name: 'Debutante',
      },
      {
        id: '04dd2d2da8eda65947666aaa',
        name: 'Outros',
      },
      {
        id: '05dd2d2da8eda65947666aaa',
        name: 'Enterro',
      },
    ],
  });

  // populate Projects
  await prisma.project.createMany({
    data: [
      {
        id: '00dddddda8eda77777666aaa',
        name: 'Casa-Diogo-Carol',
        isActive: true,
        soldValue: 2600,
        deliveryData: new Date(2022, 8, 5),
        deliveryMode: 'próprio',
        description: 'Casamento da Carol com Diogo',
        eventTypeId: '00dd2d2da8eda65947666aaa',
        clientId: '00aa2222aacdcd111111aaaa',
        recipeId: '00dd2d2da8eda65947111aaa',
      },
      {
        id: '01dddddda8eda77777666aaa',
        name: 'Niver Irene',
        isActive: false,
        soldValue: 450,
        deliveryData: new Date(2022, 4, 2),
        deliveryMode: 'próprio',
        description: 'Aniversário Mamãe',
        eventTypeId: '02dd2d2da8eda65947666aaa',
        clientId: '01aaaa22aacdcd111111aaab',
        recipeId: '01dd2d2da8eda65947111aaa',
        plannerId: '06aaaaaaaa1111111111caab',
      },
      {
        id: '02dddddda8eda77777666aaa',
        name: 'Niver Tati',
        isActive: true,
        soldValue: 500,
        deliveryData: new Date(2022, 9, 3),
        deliveryMode: 'transporte',
        description: 'Aniversário Tati',
        eventTypeId: '02dd2d2da8eda65947666aaa',
        clientId: '03aaaaaaaa1111111111aaac',
        recipeId: '01dd2d2da8eda65947111aaa',
      },
      {
        id: '03dddddda8eda77777666aaa',
        name: '15 anos Rita',
        isActive: true,
        soldValue: 2100,
        deliveryData: new Date(2022, 9, 3),
        deliveryMode: 'transporte',
        description: 'Debutante Rita',
        eventTypeId: '02dd2d2da8eda65947666aaa',
        clientId: '08aaaaaaaa1111111111aaa0',
        recipeId: '01dd2d2da8eda65947111aaa',
      },
    ],
  });

  // populate Payments
  await prisma.payment.createMany({
    data: [
      {
        id: '00dddddda8eda77777fffaaa',
        value: 200.0,
        paymentDate: new Date(2022, 0, 3),
        description: 'Sinal 1/4',
        projectId: '00dddddda8eda77777666aaa',
      },
      {
        id: '01dddddda8eda77777fffaaa',
        value: 450.0,
        paymentDate: new Date(2022, 2, 10),
        description: 'Total',
        projectId: '01dddddda8eda77777666aaa',
      },
      {
        id: '02dddddda8eda77777fffaaa',
        value: 300.0,
        paymentDate: new Date(2022, 1, 3),
        description: 'parcela 2/4',
        projectId: '00dddddda8eda77777666aaa',
      },
      {
        id: '03dddddda8eda77777fffaaa',
        value: 300.0,
        paymentDate: new Date(2022, 5, 20),
        description: 'Sinal 1/2',
        projectId: '02dddddda8eda77777666aaa',
      },
      {
        id: '04dddddda8eda77777fffaaa',
        value: 300.0,
        paymentDate: new Date(2022, 2, 3),
        description: 'parcela 3/4',
        projectId: '00dddddda8eda77777666aaa',
      },
      {
        id: '05dddddda8eda77777fffaaa',
        value: 300.0,
        paymentDate: new Date(2022, 3, 3),
        description: 'parcela 3/4',
        projectId: '01dddddda8eda77777666aaa',
      },
    ],
  });
};

main();
