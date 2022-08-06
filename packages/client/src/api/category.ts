import { request } from './request'

interface CategoryProps {
  id: number
  name: string
  menuList: MenuProps[]
}

interface MenuProps {
  id: number
  name: string
}

export const getCategory: () => Promise<CategoryProps[] | Error> = () => {
  return request({ method: 'get', requestURL: '/category' })
}
