import { ModalContext } from 'App'
import Button from 'components/common/Button'
import { useContext } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'
import { GrMoney, GrCreditCard } from 'react-icons/gr'

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
    <StyledPaymentMethodSelector>
      <Button onClick={onClickCardPayment}>
        <GrCreditCard color="white" />
        카드 결제
      </Button>
      <Button onClick={onClickCachePayment}>
        <GrMoney />
        현금 결제
      </Button>
    </StyledPaymentMethodSelector>
  )
}

const StyledPaymentMethodSelector = styled.div`
  display: flex;
  gap: 30px;

  button {
    font-size: ${theme.font.md};
    padding: 30px 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
  }

  path {
    stroke: white;
    stroke-width: 2;
  }
`
