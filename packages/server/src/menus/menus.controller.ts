import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MenusService } from './menus.service'

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  findAll() {
    return this.menusService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id)
  }
}
