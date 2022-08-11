import { Module, Options } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MySqlConfigModule } from './config/database/config.module'
import { MySqlConfigService } from './config/database/config.service'
import { OptionsModule } from './options/options.module'
import { CategoriesModule } from './categories/categories.module'
import { MenusModule } from './menus/menus.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    OptionsModule,
    CategoriesModule,
    MenusModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
