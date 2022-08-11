import { Injectable } from '@nestjs/common'
import { Option } from './entities/option.entity'

@Injectable()
export class OptionsService {
  async findAll(): Promise<any> {
    const options = await Option.createQueryBuilder('option')
      .leftJoinAndSelect('option.details', 'details')
      .getMany()

    return { result: options }
  }
}
