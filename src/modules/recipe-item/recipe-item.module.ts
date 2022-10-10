import { Module } from '@nestjs/common';
import { RecipeItemService } from './recipe-item.service';
import { RecipeItemController } from './recipe-item.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [RecipeItemController],
  providers: [RecipeItemService, PrismaService],
})
export class RecipeItemModule {}
