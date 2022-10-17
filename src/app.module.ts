import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { RecipeItemModule } from './modules/recipe-item/recipe-item.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { ItemModule } from './modules/item/item.module';
import { ClientModule } from './modules/client/client.module';
import { EventTypeModule } from './modules/event-type/event-type.module';
import { ProjectModule } from './modules/project/project.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    CategoryModule,
    RecipeItemModule,
    RecipeModule,
    ItemModule,
    ClientModule,
    EventTypeModule,
    ProjectModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
