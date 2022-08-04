import { request } from './request'

interface Menu {
  id: number
  name: string
  imgUrl: string
  price: number
  sellCount: number
  categoryId: number
}

export const getMenu: (categoryId: number) => Promise<Menu[] | Error> = (
  categoryId: number
) => {
  return request({ method: 'get', requestURL: `/menu/${categoryId}` })
}
