import { useState } from 'react'

export function CacheButtonList() {
  return (
    <ul>
      <li>
        <button>10,000원</button>
      </li>
      <li>
        <button>5,000원</button>
      </li>
      <li>
        <button>1,000원</button>
      </li>
      <li>
        <button>500원</button>
      </li>
    </ul>
  )
}

function PayButton() {
  return <button>현금 결제하기</button>
}

interface CachePaymentProps {
  orderAmount: number
}

export default function CachePayment({ orderAmount }: CachePaymentProps) {
  const [paymentAmount, setPaymentAmount] = useState(0)

  return (
    <div>
      <div>
        <div>투입 금액 {paymentAmount.toLocaleString()}원</div>
        <div>주문 금액 {orderAmount.toLocaleString()}원</div>
      </div>
      <CacheButtonList />
      <PayButton />
    </div>
  )
}
