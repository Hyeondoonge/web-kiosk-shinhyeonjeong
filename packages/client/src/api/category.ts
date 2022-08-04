import { request } from './request'

interface Category {
  id: number
  name: string
}

export const getCategory: () => Promise<Category[] | Error> = () => {
  return request({ method: 'get', requestURL: '/category' })
}
