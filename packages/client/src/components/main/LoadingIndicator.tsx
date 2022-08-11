import { postOrder } from 'api/orders'
import { CartContext, ModalContext } from 'App'
import { useContext, useEffect, useState } from 'react'
import { OrderType } from 'type'
import Receipt from './Receipt'

interface TimerProps {
  deleteAllCartMenu: () => void
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
// 결제창으로 사용
export default function LoadingIndicator() {
  const [cartMenuList, setCartMenuList] = useContext(CartContext)
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext)
  const [order, setOrder] = useState<OrderType>()

  const onPaymentSuccess = () => {
    if (!isModalOpen || !setIsModalOpen) return
    setIsModalOpen({ ...isModalOpen, receipt: true, loading: false })
  }

  const onPaymentFail = () => {
    if (!isModalOpen || !setIsModalOpen) return
    setIsModalOpen({ ...isModalOpen, loading: false })
    alert('결제 실패했습니다. 초기화면으로 돌아갑니다.')
  }

  useEffect(() => {
    setTimeout(async () => {
      const random = 0

      // if (random === 0) {
      //   onPaymentFail()
      // } else
      {
        if (!cartMenuList || cartMenuList.length === 0) return
        const response = await postOrder(cartMenuList)

        if (response instanceof Error) return

        setOrder(response)
        console.log(response)
        // onPaymentSuccess()
      }
    }, 500)
  }, [])

  return (
    <div>
      {order === undefined ? (
        '🫥 카드 결제중'
      ) : (
        <>
          <Receipt
            order={order}
            deleteAllCartMenu={() => {
              if (!setCartMenuList) return
              setCartMenuList([])
            }}
          />
          <Timer
            deleteAllCartMenu={() => {
              if (!setCartMenuList) return
              setCartMenuList([])
            }}
          />
        </>
      )}
    </div>
  )
}
