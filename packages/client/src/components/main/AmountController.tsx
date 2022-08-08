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
    <div>
      <button onClick={decreaseAmount}>-</button>
      <input type="text" value={amount} />개
      <button onClick={increaseAmount}>+</button>
    </div>
  )
}
