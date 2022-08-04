import { Module, Options } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { CategoryController } from './category/category.controller'
import { CategoryService } from './category/category.service'
import { MenuController } from './menu/menu.controller'
import { MenuService } from './menu/menu.service'
import { OptionController } from './option/option.controller'
import { OptionService } from './option/option.service'
import { OrdersController } from './orders/orders.controller'
import { OrdersService } from './orders/orders.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    CategoryController,
    MenuController,
    OptionController,
    OrdersController,
  ],
  providers: [
    AppService,
    CategoryService,
    MenuService,
    OptionService,
    OrdersService,
  ],
})
export class AppModule {}
