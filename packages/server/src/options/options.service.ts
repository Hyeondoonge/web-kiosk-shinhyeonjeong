import { Injectable } from '@nestjs/common'
import { Menu } from 'src/menus/entities/menu.entity'
import { Option } from './entities/option.entity'

@Injectable()
export class OptionsService {
  async findAll(): Promise<any> {
    const options = await Option.createQueryBuilder('option')
      .leftJoinAndSelect('option.details', 'details')
      .getMany()

    return { result: options }
  }

  async findOne(menuId: number): Promise<any> {
    const options = await Menu.createQueryBuilder('menu')
      .leftJoinAndSelect('menu.options', 'options')
      .leftJoinAndSelect('options.detailList', 'optionDetail')
      .where('menu.id = :menuId', {
        menuId,
      })
      .getOne()
    console.log(options)
    return { result: options }
  }
}
