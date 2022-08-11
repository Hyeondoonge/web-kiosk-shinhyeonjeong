import { Injectable } from '@nestjs/common'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {
  async findAll(): Promise<any> {
    const categories = await Category.createQueryBuilder('category').getMany()

    return { result: categories }
  }
}
