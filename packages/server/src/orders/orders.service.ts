import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order, PaymentMethod } from './entities/order.entity'
import { OrderDetail } from './entities/orderDetail.entity'

@Injectable()
export class OrdersService {
  // 주문 내역 등록
  async create(createOrderDto: CreateOrderDto) {
    const { paymentMethod, totalPrice, orderDetailList } = createOrderDto
    // 주문 번호를 얻어온다.

    const today = new Date()
    const fromDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    )

    const orderNumber =
      (await Order.createQueryBuilder()
        .andWhere(':fromDate <= createdAt')
        .setParameters({ fromDate })
        .getCount()) + 1

    const createdOrder = await Order.create({
      orderNumber,
      totalPrice,
      paymentMethod: PaymentMethod[paymentMethod],
    }).save()

    const createdOrderDetailList = []

    console.log('주문번호: ' + orderNumber)

    for (const orderDetail of orderDetailList) {
      const { menuName, count, menuTotalPrice, options } = orderDetail

      const createdOrderDetail = OrderDetail.create({
        count,
        menuName,
        totalPrice: menuTotalPrice,
        orderDetailOptionList: options,
        orderId: createdOrder.id,
      })
      createdOrderDetail.save()
      createdOrderDetailList.push(createdOrderDetail)
    }

    // 해당하는 메뉴에 대한 salesByDate의 count값을 증가해준다.

    // 주문번호 포함한 주문한 내역을 반환

    return {
      message: 'create order successfully',
      result: { ...createdOrder, orderDetailList: createdOrderDetailList },
    }
  }
}
