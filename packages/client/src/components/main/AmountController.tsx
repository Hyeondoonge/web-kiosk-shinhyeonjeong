import theme from 'style/theme'
import styled from 'styled-components'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface AmountControllerProps {
  amount: number
  updateAmount: (amount: number) => void
}

export default function AmountController({
  amount,
  updateAmount,
}: AmountControllerProps) {
  const increaseAmount = () => {
    updateAmount(amount + 1)
  }

  const decreaseAmount = () => {
    if (amount === 1) return
    updateAmount(amount - 1)
  }

  return (
    <StyledAmountController>
      <button onClick={decreaseAmount}>
        <IoRemoveCircleOutline />
      </button>
      <input type="text" value={amount} />개
      <button onClick={increaseAmount}>
        <IoAddCircleOutline />
      </button>
    </StyledAmountController>
  )
}

const StyledAmountController = styled.div`
  display: flex;
  align-items: center;
  width: 130px;
  padding: 5px 10px;
  font-size: ${theme.font.sm};

  input {
    padding: 0;
    width: 20%;
    font-size: ${theme.font.sm};
  }

  button {
    display: flex;
    align-items: center;
    padding: 0;
    font-size: ${theme.font.sm};

    &:hover {
      background-color: ${theme.palette.hoverBackground};
    }
  }
`
