import { Injectable } from '@nestjs/common'
import { SalesByDate } from 'src/menus/entities/salesByDate.entity'
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
      const { menuName, menuId, count, menuTotalPrice, options } = orderDetail

      // OrderDetail 정보를 추가한다. Option정보를 포함하고 있다.
      const createdOrderDetail = OrderDetail.create({
        count,
        menuName,
        totalPrice: menuTotalPrice,
        orderDetailOptionList: options,
        orderId: createdOrder.id,
      }).save()
      createdOrderDetailList.push(createdOrderDetail)

      const date = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

      // 주문된 메뉴 그리고 오늘날짜에 해당하는 salesByDate를 구해와서 count만큼 값을 높여준다.
      const salesByDate = await SalesByDate.createQueryBuilder()
        .andWhere('menuId = :menuId', { menuId })
        .andWhere('date = :date', { date })
        .getOne()

      if (salesByDate) {
        SalesByDate.createQueryBuilder()
          .update({
            count: salesByDate.count + count,
          })
          .where({ date, menuId })
          .execute()
      } else {
        SalesByDate.create({
          date,
          count,
          menuId,
        }).save()
      }

      console.log(salesByDate)
    }

    // 해당하는 메뉴에 대한 salesByDate의 count값을 증가해준다.

    // 주문번호 포함한 주문한 내역을 반환

    return {
      message: 'create order successfully',
      result: { ...createdOrder, orderDetailList: createdOrderDetailList },
    }
  }
}
