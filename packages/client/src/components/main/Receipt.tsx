import { useState } from 'react'
import { OrderType, SelectedMenuType } from 'type'

interface ReceiptProps {
  order: OrderType
}

interface OrderedMenuListProps {
  selectedMenuList: SelectedMenuType[]
}

function OrderedMenuList({ selectedMenuList }: OrderedMenuListProps) {
  const ORDERED_MENU_TOTAL_PRICE = 15000

  return (
    <ul>
      {selectedMenuList.map(
        ({ id, name, amount, price, selectedOptionList }) => (
          <li key={id}>
            <div>
              {name} {amount}개
            </div>
            <ul>
              {selectedOptionList.map(({ id: optionId, optionDetail }) => {
                const { id: optionDetailId, name, price } = optionDetail

                return (
                  <li key={`${optionId}_${optionDetailId}`}>
                    {name} ({optionDetail.price.toLocaleString()}원)
                  </li>
                )
              })}
            </ul>
            {ORDERED_MENU_TOTAL_PRICE.toLocaleString()}원
          </li>
        )
      )}
    </ul>
  )
}

function Timer() {
  const INITIAL_LEFT_TIME = 10
  const [leftTime, setLeftTime] = useState(INITIAL_LEFT_TIME)

  return <div>남은시간 {leftTime}초</div>
}

export default function Receipt({
  order: { id, orderNumber, selectedMenuList, paymentMethod, paymentAmount },
}: ReceiptProps) {
  const ORDER_AMOUNT = 50000

  return (
    <div>
      <div>주문 번호 {orderNumber}</div>
      <OrderedMenuList selectedMenuList={selectedMenuList} />
      <div>
        <div>총 주문금액 {ORDER_AMOUNT}</div>
        <div>총 결제금액 {paymentAmount}</div>
        <div>잔돈 {ORDER_AMOUNT - paymentAmount}</div>
        <div>결제방법 {paymentMethod}</div>
      </div>
      <Timer />
    </div>
  )
}
