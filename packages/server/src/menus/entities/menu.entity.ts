import { Category } from 'src/categories/entities/category.entity'
import { Option } from 'src/options/entities/option.entity'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { SalesByDate } from './salesByDate.entity'

@Entity({ name: 'menu_table' })
@Unique(['name'])
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 10 })
  name: string

  @Column({ type: 'text' })
  imgUrl: string

  @Column()
  price: number

  @Column()
  categoryId: number

  @ManyToOne(() => Category, (category) => category.menu)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @OneToMany(() => SalesByDate, (salesByDate) => salesByDate.menu, {
    cascade: true,
  })
  salesByDate: SalesByDate[]

  @ManyToMany(() => Option)
  @JoinTable({
    name: 'item_option_table',
    joinColumn: { name: 'itemId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'optionId', referencedColumnName: 'id' },
  })
  options: Option[]
}
