import { Category } from 'src/categories/entities/category.entity'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'menu_table' })
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
}
