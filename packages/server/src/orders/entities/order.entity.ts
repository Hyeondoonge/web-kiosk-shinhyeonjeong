import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderDetail } from './orderDetail.entity'

export enum PaymentMethod {
  '현금' = '현금',
  '카드' = '카드',
}

@Entity({ name: 'order_table' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  orderNumber: number

  @Column()
  totalPrice: number

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetailList: OrderDetail[]
}