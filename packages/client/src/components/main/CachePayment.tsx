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

export default function CachePayment() {
  return (
    <div>
      <div>
        <div>투입 금액 7000원</div>
        <div>주문 금액 9000원</div>
      </div>
      <CacheButtonList />
      <PayButton />
    </div>
  )
}
