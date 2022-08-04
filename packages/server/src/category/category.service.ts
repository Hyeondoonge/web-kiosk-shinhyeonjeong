import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category'
  }

  findAll() {
    return [
      {
        id: 1,
        name: '커피',
      },

      {
        id: 2,
        name: '라떼',
      },
      {
        id: 3,
        name: '쥬스',
      },
      {
        id: 4,
        name: '티',
      },
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`
  }

  remove(id: number) {
    return `This action removes a #${id} category`
  }
}
