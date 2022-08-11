// 파일 경로: migration/dataSource.ts
import * as mysqlDriver from 'mysql2'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { Menu } from '../menus/entities/menu.entity'
import { Category } from '../categories/entities/category.entity'
import { SalesByDate } from '../menus/entities/salesByDate.entity'
import { Option } from '../options/entities/option.entity'
import { OptionDetail } from '../options/entities/optionDetail.entity'

// 경로에 맞게 env파일을 불러와 주세요.
dotenv.config({ path: path.resolve(__dirname + '../../../.env') })

export function getConfig() {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    entities: [Menu, Category, SalesByDate, Option, OptionDetail],
  } as DataSourceOptions
}

// database와 연결하는 과정입니다.
const datasource = new DataSource(getConfig())

export default datasource
