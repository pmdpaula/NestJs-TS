import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { RecipeItemModule } from './modules/recipe-item/recipe-item.module';

@Module({
  imports: [CategoryModule, RecipeItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
