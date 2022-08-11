import { Category } from '../../categories/entities/category.entity'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Menu } from './menu.entity'

@Entity({ name: 'sales_by_date' })
export class SalesByDate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

  @Column()
  count: number

  @Column()
  menuId: number

  @ManyToOne(() => Menu, (menu) => menu.salesByDate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuId' })
  menu: Menu
}
