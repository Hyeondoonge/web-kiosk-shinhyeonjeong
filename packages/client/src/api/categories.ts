import { MenuDto } from 'dto'
import { CategoryType, MenuType } from 'type'
import { request } from './request'

export const getCategories: () => Promise<
  CategoryType[] | Error
> = async () => {
  const response = await request({
    method: 'get',
    requestURL: '/categories/menu',
  })

  if (response instanceof Error) {
    console.log('카테고리를 가져오지 못했어요!')

    return response
  }

  const categories: CategoryType[] = []
  for (const { id, name, menu } of response.result) {
    const category = {
      id: Number(id),
      name: String(name),
      menuList: formatMenuList(menu),
    }
    categories.push(category)
  }

  function formatMenuList(menu: any) {
    return menu.map(
      ({ id, name, imgUrl, price, categoryId, salesByDate }: MenuDto) => {
        const totalSellCount = salesByDate
          .map(({ count }) => count)
          .reduce((prev, cur) => prev + cur, 0)
        const todaySellCount = salesByDate
          .filter(({ date }) => {
            const today = new Date()
            const todayStr = `${today
              .getFullYear()
              .toString()
              .padStart(2, '0')}-
            ${today.getFullYear().toString().padStart(2, '0')}-
            ${today.getFullYear().toString().padStart(2, '0')}
          }`

            return todayStr === date
          })
          .map(({ count }) => count)
          .reduce((prev, cur) => {
            return prev + cur
          }, 0)

        return {
          id,
          name,
          price,
          imgUrl,
          totalSellCount,
          todaySellCount,
        }
      }
    )
  }

  return categories.sort((a, b) => a.id - b.id)
}
