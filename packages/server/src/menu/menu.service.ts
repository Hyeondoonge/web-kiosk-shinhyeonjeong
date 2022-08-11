import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'

@Injectable()
export class MenuService {
  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu'
  }

  findAll(categoryId) {
    console.log(categoryId, typeof categoryId)
    return [
      {
        id: 1,
        name: '아메리카노',
        imgUrl: '',
        price: '1000',
        sellCount: '5',
        categoryId,
      },
      {
        id: 2,
        name: '돌체라떼',
        imgUrl: '',
        price: '1000',
        sellCount: '5',
        categoryId,
      },
      {
        id: 3,
        name: '카페라떼',
        imgUrl: '',
        price: '3500',
        sellCount: '15',
        categoryId,
      },
      {
        id: 4,
        name: '헤이즐넛 커피',
        imgUrl: '',
        price: '2100',
        sellCount: '5',
        categoryId,
      },
      {
        id: 5,
        name: '콜드브루',
        imgUrl: '',
        price: '1500',
        sellCount: '15',
        categoryId,
      },
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`
  }

  remove(id: number) {
    return `This action removes a #${id} menu`
  }
}
