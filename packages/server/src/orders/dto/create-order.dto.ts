interface Menu {
  name: string
  count: number
  menuTotalPrice: number
  optionsDetailId: number[]
}

export interface CreateOrderDto {
  paymentMethod: string
  menu: Menu[]
}
