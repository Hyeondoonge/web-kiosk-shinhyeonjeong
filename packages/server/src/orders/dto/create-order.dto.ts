export class CreateOrderDto {
  paymentMethod: string
  totalPrice: number
  orderDetailList: OrderDetailDto[]
}

export interface OrderDetailDto {
  menuName: string
  menuId: number
  count: number
  menuTotalPrice: number
  options: string // { 'option_name': 'option_value', '': '' }[]
}
