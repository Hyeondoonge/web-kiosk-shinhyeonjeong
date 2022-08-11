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
import { OrderDetailOption } from './orderDetailOption.entity'

@Entity({ name: 'order_detail_table' })
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  orderNumber: number

  @Column()
  totalPrice: number

  @Column()
  orderId: number

  @ManyToOne(() => Order, (order) => order.orderDetailList)
  @JoinColumn({ name: 'orderId' })
  order: Order

  @OneToMany(
    () => OrderDetailOption,
    (orderDetailOption) => orderDetailOption.orderDetail
  )
  orderDetailOptionList: OrderDetail[]
}
