import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Option } from './option.entity'

@Entity()
export class OptionDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column()
  price: number

  @ManyToOne(() => Option, (option) => option.detailList)
  @JoinColumn({ name: 'optionId' })
  option: Option
}
