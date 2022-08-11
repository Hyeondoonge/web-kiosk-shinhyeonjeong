import { Injectable } from '@nestjs/common'

@Injectable()
export class MenusService {
  findAll() {
    return `This action returns all menus`
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`
  }

  remove(id: number) {
    return `This action removes a #${id} menu`
  }
}
