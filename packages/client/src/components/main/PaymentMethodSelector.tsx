import { ModalContext } from 'App'
import { useContext } from 'react'

export default function PaymentMethodSelector() {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext)
  const onClickCachePayment = () => {
    if (!isModalOpen || !setIsModalOpen) return
    setIsModalOpen({ ...isModalOpen, cachePayment: true })
  }
  const onClickCardPayment = () => {
    if (!isModalOpen || !setIsModalOpen) return
    setIsModalOpen({ ...isModalOpen, loading: true, paymentMethod: false })
  }

  return (
    <div>
      <button onClick={onClickCardPayment}>카드 결제</button>
      <button onClick={onClickCachePayment}>현금 결제</button>
    </div>
  )
}
