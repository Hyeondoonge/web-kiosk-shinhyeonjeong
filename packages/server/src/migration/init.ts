// 파일 경로 migration/init.ts

import datasource from './dataSource'
import mockup from '../data.json'
import { Menu } from '../menus/entities/menu.entity'
import { Category } from '../categories/entities/category.entity'

async function init() {
  const data = mockup.data

  for (const d of data) {
    // 카테고리 순회
    const menu = new Category()
    menu.name = d.name

    // 새롭게 만들어진 카테고리를 반환합니다.
    const category = await datasource.getRepository('category_table').save(menu) // 1

    console.log(category.name)

    for (const m of d.products) {
      console.log(d.products)

      // 카테고리 안에 있는 product 순회
      const menuItem = new Menu()
      const { name, imgUrl, price } = m
      // 필요한 property를 적어줍니다.
      menuItem.name = name
      menuItem.price = price
      menuItem.imgUrl = imgUrl
      menuItem.categoryId = category.id // 2
      const newMenu = await datasource
        .getRepository('menu_table')
        .save(menuItem)
      // await datasource.getRepository('menu_option_table').save({
      //   menuId: newMenu.id,
      //   optionId: 1,
      // })
      // await datasource.getRepository('menu_option_table').save({
      //   menuId: newMenu.id,
      //   optionId: 2,
      // })
    }
  }
}

datasource.initialize().then(() => {
  init().then(() => {
    console.log('complete')
  }) // 3
})
