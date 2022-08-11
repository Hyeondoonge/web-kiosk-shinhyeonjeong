import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { OptionDetail } from './optionDetail.entity'

@Entity({ name: 'option_table' })
@Unique(['name'])
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 })
  name: string

  @OneToMany(() => OptionDetail, (optionDetail) => optionDetail.option)
  detailList: OptionDetail[]
}
