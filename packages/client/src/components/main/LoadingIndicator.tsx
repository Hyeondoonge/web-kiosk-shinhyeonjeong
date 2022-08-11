import { ModalContext } from 'App'
import { useContext, useEffect } from 'react'

export default function LoadingIndicator() {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext)
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
    setTimeout(() => {
      const random = 0

      if (random === 0) {
        onPaymentFail()
      } else {
        onPaymentSuccess()
      }
    }, 500)
  }, [])

  return <div>🫥 카드 결제중</div>
}
