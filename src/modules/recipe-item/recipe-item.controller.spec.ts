import { Test, TestingModule } from '@nestjs/testing';
import { RecipeItemController } from './recipe-item.controller';
import { RecipeItemService } from './recipe-item.service';

describe('RecipeItemController', () => {
  let controller: RecipeItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeItemController],
      providers: [RecipeItemService],
    }).compile();

    controller = module.get<RecipeItemController>(RecipeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
