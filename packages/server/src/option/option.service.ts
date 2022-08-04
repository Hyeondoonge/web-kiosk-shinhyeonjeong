import { Injectable } from '@nestjs/common'
import { CreateOptionDto } from './dto/create-option.dto'
import { UpdateOptionDto } from './dto/update-option.dto'

@Injectable()
export class OptionService {
  create(createOptionDto: CreateOptionDto) {
    return 'This action adds a new option'
  }

  // TODO: 함수명 바꾸기
  findAll(menuId) {
    console.log('get option by menuId', menuId)
    return [
      {
        id: 1,
        name: '온도',
        optionDetail: [
          {
            id: 1,
            name: 'HOT',
            price: 1000,
          },
          {
            id: 2,
            name: 'ICE',
            price: 0,
          },
        ],
      },
      {
        id: 2,
        name: '샷 추가',
        optionDetail: [
          {
            id: 1,
            name: '1 SHOT',
            price: 500,
          },
          {
            id: 2,
            name: '2 SHOT',
            price: 800,
          },
        ],
      },
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} option`
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return `This action updates a #${id} option`
  }

  remove(id: number) {
    return `This action removes a #${id} option`
  }
}
