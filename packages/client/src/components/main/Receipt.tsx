import { ModalContext } from 'App'
import { useContext, useEffect, useState } from 'react'
import { OrderType, SelectedMenuType } from 'type'

interface ReceiptProps {
  order: OrderType
  deleteAllCartMenu: () => void
}

interface OrderedMenuListProps {
  selectedMenuList: SelectedMenuType[]
}

interface TimerProps {
  deleteAllCartMenu: () => void
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

function Timer({ deleteAllCartMenu }: TimerProps) {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext)

  const INITIAL_LEFT_TIME = 10
  const [leftTime, setLeftTime] = useState(INITIAL_LEFT_TIME)

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((leftTIme) => leftTIme - 1)
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (leftTime === 0) {
      if (!isModalOpen || !setIsModalOpen) return
      setIsModalOpen({ ...isModalOpen, receipt: false })
      deleteAllCartMenu()
    }
  }, [leftTime])

  return (
    <div>
      남은시간 {leftTime}초
      <div>주의: 이 화면은 10초 뒤에 자동으로 사라집니다.</div>
    </div>
  )
}

export default function Receipt({
  order: { id, orderNumber, selectedMenuList, paymentMethod, paymentAmount },
  deleteAllCartMenu,
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
      <Timer deleteAllCartMenu={deleteAllCartMenu} />
    </div>
  )
}
