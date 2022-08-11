import { ModalContext } from 'App'
import { useContext, useState } from 'react'

interface CacheButtonListProps {
  increasePaymentAmount: (amount: number) => void
}

// TODO: Cache -> Cash 이름 변경..
export function CacheButtonList({
  increasePaymentAmount,
}: CacheButtonListProps) {
  const cashList = [500, 1000, 5000, 10000]

  return (
    <ul>
      {cashList.map((cash) => (
        <li>
          <button
            onClick={() => {
              increasePaymentAmount(cash)
            }}
          >
            {cash.toLocaleString()}원
          </button>
        </li>
      ))}
    </ul>
  )
}

interface PayButtonProps {
  disabled: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function PayButton({ disabled, onClick }: PayButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      현금 결제하기
    </button>
  )
}

interface CachePaymentProps {
  orderAmount: number
}

export default function CachePayment({ orderAmount }: CachePaymentProps) {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext)

  const [paymentAmount, setPaymentAmount] = useState(0)

  const onClickPayButton = () => {
    if (!isModalOpen || !setIsModalOpen) return

    setIsModalOpen({
      ...isModalOpen,
      cachePayment: false,
      paymentMethod: false,
      receipt: true,
    })
  }

  return (
    <div>
      <div>
        <div>투입 금액 {paymentAmount.toLocaleString()}원</div>
        <div>주문 금액 {orderAmount.toLocaleString()}원</div>
      </div>
      <CacheButtonList
        increasePaymentAmount={(cash) => {
          setPaymentAmount((paymentAmount) => paymentAmount + cash)
        }}
      />
      <PayButton
        disabled={paymentAmount < orderAmount}
        onClick={onClickPayButton}
      />
    </div>
  )
}
