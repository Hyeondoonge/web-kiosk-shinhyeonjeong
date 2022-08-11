import { getCartTotalAmount } from 'components/util'
import { CartMenuType, OrderOptionDetailType, OrderType } from 'type'
import { request } from './request'

export const postOrder: PostOrderType = async (cartMenu: CartMenuType[]) => {
  const userOrder: any = {
    paymentMethod: '카드',
    totalPrice: getCartTotalAmount(cartMenu),
    orderDetailList: cartMenu.map(
      ({ id, name, amount, selectedOptionList, price }) => ({
        menuId: id,
        menuName: name,
        count: amount,
        menuTotalPrice: price * amount,
        options: selectedOptionList
          .map(
            ({ name, optionDetail }) =>
              `${name}:${optionDetail.name}:${optionDetail.price}`
          )
          .join('@'),
      })
    ),
  }

  const response = await request({
    method: 'post',
    requestURL: '/orders',
    body: userOrder,
  })

  if (response instanceof Error) {
    console.log('주문 중 오류발생!')

    return response
  }

  const { orderNumber, totalPrice, paymentMethod, orderDetailList, id } =
    response.result

  const selectedMenuList = orderDetailList.map(
    ({ id, menuName, count, totalPrice, orderDetailOptionList }: any) => {
      const selectedOptionList: OrderOptionDetailType[] = []

      const splitOptions = orderDetailOptionList.split('@')

      for (const splitOption of splitOptions) {
        const [_, name, price] = splitOption.split(':')
        const optionList: OrderOptionDetailType = {
          name,
          price,
        }

        selectedOptionList.push(optionList)
      }

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
