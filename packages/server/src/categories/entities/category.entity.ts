import { Menu } from 'src/menus/entities/menu.entity'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity({ name: 'category_table' })
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 })
  name: string

  @OneToMany(() => Menu, (menu) => menu.category)
  menu: Menu[]
}
