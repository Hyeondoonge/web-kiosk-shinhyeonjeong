import { postOrder } from 'api/orders'
import { CartContext, ModalContext } from 'App'
import { useContext, useEffect, useState } from 'react'
import { OrderType } from 'type'
import Receipt from './Receipt'

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
        onPaymentSuccess()
      }
    }, 500)
  }, [])

  return (
    <div>
      🫥 카드 결제중
      {order && (
        <Receipt
          order={order}
          deleteAllCartMenu={() => {
            if (!setCartMenuList) return
            setCartMenuList([])
          }}
        />
      )}
    </div>
  )
}
