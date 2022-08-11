import { Injectable } from '@nestjs/common'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {
  async findAll(): Promise<any> {
    const categories = await Category.createQueryBuilder('category').getMany()

    return { message: 'get all categories successfully', result: categories }
  }

  async findAllWithMenu(): Promise<any> {
    const categories = await Category.createQueryBuilder('category')
      .leftJoinAndSelect('category.menu', 'menu')
      .leftJoinAndSelect('menu.salesByDate', 'salesByDate')
      .getMany()

    console.log(categories)

    return {
      message: 'get all categories with Menu successfully',
      result: categories,
    }
  }
}
