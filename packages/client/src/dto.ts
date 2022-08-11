export interface CategoryDto {
  id: number
  name: string
  menu: MenuDto[]
}

export interface MenuDto {
  id: number
  name: string
  imgUrl: string
  price: number
  categoryId: number
  salesByDate: SalesByDateDto[]
}

export interface SalesByDateDto {
  id: number
  date: string
  count: number
  menuId: number
}

export interface OptionDto {
  id: number
  name: string
  detailList: OptionDetailDto[]
}

export interface OptionDetailDto {
  id: number
  name: string
  price: number
  optionId: number
}

export interface CreateOrderDto {
  paymentMethod: string
  totalPrice: number
  orderDetailList: [
    {
      menuId: number
      menuName: string
      count: number
      menuTotalPrice: number
      options: string
    }
  ]
}

export interface OrderDto {
  orderNumber: number
  totalPrice: number
  paymentMethod: string
  id: number
  createdAt: string
  orderDetailList: [
    {
      id: number
      menuName: string
      count: number
      totalPrice: number
      orderDetailOptionList: string
      orderId: number
      createdAt: string
    }
  ]
}
