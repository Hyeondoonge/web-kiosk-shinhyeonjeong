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
import { OrderDetail } from './orderDetail.entity'

@Entity({ name: 'order_detail_option' })
export class OrderDetailOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  orderNumber: number

  @Column()
  totalPrice: number

  @Column()
  orderDetailId: number

  @ManyToOne(
    () => OrderDetail,
    (orderDetail) => orderDetail.orderDetailOptionList
  )
  @JoinColumn({ name: 'orderDetailId' })
  orderDetail: OrderDetail
}
