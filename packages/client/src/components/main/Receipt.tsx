import { ModalContext } from 'App'
import { useContext, useEffect, useState } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'
import { OrderMenuType, OrderType } from 'type'

interface ReceiptProps {
  order: OrderType
  deleteAllCartMenu: () => void
}

interface OrderedMenuListProps {
  orderMenuList: OrderMenuType[]
}

function OrderedMenuList({ orderMenuList }: OrderedMenuListProps) {
  const ORDERED_MENU_TOTAL_PRICE = 15000

  return (
    <ul>
      {orderMenuList.map(({ id, name, amount, price, selectedOptionList }) => (
        <li key={id}>
          <div style={{ fontWeight: 700 }}>
            {name} {amount}개
          </div>
          <ul>
            {selectedOptionList.map((optionDetail, index) => {
              const { name, price } = optionDetail

              return (
                <li key={`${index}`}>
                  • {name} (+{price.toLocaleString()}원)
                </li>
              )
            })}
          </ul>
          {ORDERED_MENU_TOTAL_PRICE.toLocaleString()}원
        </li>
      ))}
    </ul>
  )
}

export default function Receipt({
  order: { id, orderNumber, orderMenuList, paymentMethod, paymentAmount },
  deleteAllCartMenu,
}: ReceiptProps) {
  const ORDER_AMOUNT = 50000

  return (
    <StyledReceipt>
      <div className="orderNumber">주문 번호 {orderNumber}</div>
      <OrderedMenuList orderMenuList={orderMenuList} />
      <div>총 주문금액 {ORDER_AMOUNT.toLocaleString()}원</div>
      <div>총 결제금액 {paymentAmount.toLocaleString()}원</div>
      <div>잔돈 {(ORDER_AMOUNT - paymentAmount).toLocaleString()}원</div>
      <div>결제방법 {paymentMethod}</div>
    </StyledReceipt>
  )
}

const StyledReceipt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: ${theme.font.sm};
  .orderNumber {
    font-size: ${theme.font.lg};
    font-weight: 700;
    text-align: center;
  }
  transition: 1s;
`
