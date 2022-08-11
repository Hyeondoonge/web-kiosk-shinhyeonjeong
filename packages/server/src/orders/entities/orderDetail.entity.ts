import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './order.entity'

@Entity({ name: 'order_detail_table' })
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  menuName: string

  @Column()
  count: number

  @Column()
  totalPrice: number

  @Column()
  orderId: number

  @Column()
  orderDetailOptionList: string

  @ManyToOne(() => Order, (order) => order.orderDetailList)
  @JoinColumn({ name: 'orderId' })
  order: Order
}
