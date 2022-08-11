import { CartMenuType, OrderOptionDetailType, OrderType } from 'type'
import { request } from './request'

export const postOrder: PostOrderType = async (cartMenu: CartMenuType[]) => {
  const response = await request({
    method: 'post',
    requestURL: '/orders',
    body: cartMenu,
  })

  if (response instanceof Error) {
    console.log('주문 중 오류발생!')

    return response
  }

  const { orderNumber, totalPrice, paymentMethod, orderDetailList, id } =
    response

  const selectedMenuList = orderDetailList.map(
    ({ id, menuName, count, totalPrice, orderDetailOptionList }: any) => {
      const selectedOptionList: OrderOptionDetailType[] = []

      const splitOptions = orderDetailOptionList.split('@')

      const optionList: OrderOptionDetailType = {
        name: splitOptions[1],
        price: splitOptions[2],
      }

      selectedOptionList.push(optionList)

      return {
        id,
        name: menuName,
        price: totalPrice,
        amount: count,
        selectedOptionList,
      }
    }
  )

  const order: OrderType = {
    id,
    orderNumber,
    paymentMethod,
    paymentAmount: totalPrice,
    orderMenuList: selectedMenuList,
  }

  return order
}

type PostOrderType = (order: CartMenuType[]) => Promise<OrderType | Error>
