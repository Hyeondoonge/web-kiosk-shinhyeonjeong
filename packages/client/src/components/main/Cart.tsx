import { ModalContext } from 'App'
import { getCartTotalAmount } from 'components/util'
import { useContext, useEffect, useRef, useState } from 'react'
import { CartMenuType, SelectedMenuType } from 'type'
import AmountController from './AmountController'

interface CartProps {
  cartMenuList: CartMenuType[]
  updateCartMenuList: (newSelectedMenuList: CartMenuType[]) => void
  deleteAllCartMenu: () => void
}

interface CartMenuListProps {
  cartMenuList: CartMenuType[]
  updateCartMenuList: (newSelectedMenuList: CartMenuType[]) => void
}

interface ButtonProps {
  value: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function CartMenuList({ cartMenuList, updateCartMenuList }: CartMenuListProps) {
  const totalAmount = (selectedMenuWithOption: CartMenuType) => {
    const { price, amount, selectedOptionList } = selectedMenuWithOption
    let sum = 0

    for (const selectedOption of selectedOptionList) {
      sum += selectedOption.optionDetail.price
    }

    sum += price

    return sum * amount
  }

  return (
    <ul>
      {cartMenuList.map((cartMenu, index) => {
        const { cartId, id, name, price, selectedOptionList, amount } = cartMenu

        return (
          <li key={cartId}>
            <button
              onClick={() => {
                const newSelectedMenuList = [...cartMenuList].filter(
                  ({ cartId: deleteCartId }) => cartId !== deleteCartId
                )

                updateCartMenuList(newSelectedMenuList)
              }}
            >
              X
            </button>
            <div>{name}</div>
            <div>{totalAmount(cartMenu).toLocaleString()}원</div>
            <div>
              {selectedOptionList
                .map(({ optionDetail }) => optionDetail.name)
                .join(', ')}
            </div>
            <AmountController
              amount={amount}
              updateAmount={(newAmount) => {
                const newCartMenuList = [...cartMenuList]
                newCartMenuList[index].amount = newAmount
                updateCartMenuList(newCartMenuList)
              }}
            />
          </li>
        )
      })}
    </ul>
  )
}

interface TimerProps {
  cartMenuList: SelectedMenuType[]
  deleteAllCartMenu: () => void
}

function Timer({ cartMenuList, deleteAllCartMenu }: TimerProps) {
  const INITIAL_LEFT_TIME = 10
  const [leftTime, setLeftTime] = useState<number>(INITIAL_LEFT_TIME)
  const interval = useRef<any>(null)

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
    setLeftTime(INITIAL_LEFT_TIME)

    if (cartMenuList.length === 0) return

    // + 담긴 상품이 없을 때는 실행되지 않도록 할 수도 있음.
    interval.current = setInterval(() => {
      // setLeftTime((leftTime) => leftTime - 1)
    }, 1000)
  }, [cartMenuList])

  useEffect(() => {
    if (leftTime === 0) {
      clearInterval(interval.current)
      deleteAllCartMenu()
    }
  }, [leftTime])

  return <div>{leftTime}초</div>
}

function Button({ onClick, value }: ButtonProps) {
  return <button onClick={onClick}>{value}</button>
}

// cartMenuList={cartMenuList}
// updateCartMenuList={(newCartMenuList) => {
//   setCartMenuList(newCartMenuList)
// }}
// deleteAllCartMenu={deleteAllCartMenu}
// updateCartMenuList={(newCartMenuList) => {
//   setCartMenuList(newCartMenuList)
// }}
export default function Cart({
  cartMenuList,
  updateCartMenuList,
  deleteAllCartMenu,
}: CartProps) {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext)
  const onClickAllCancel = () => {
    deleteAllCartMenu()
  }
  const onClickPayButton = () => {
    if (!setIsModalOpen || !isModalOpen) return

    setIsModalOpen({
      ...isModalOpen,
      paymentMethod: true,
    })
  }

  return (
    <div>
      <CartMenuList
        cartMenuList={cartMenuList}
        updateCartMenuList={updateCartMenuList}
      />
      <Timer
        cartMenuList={cartMenuList}
        deleteAllCartMenu={deleteAllCartMenu}
      />
      <Button value="전체 취소" onClick={onClickAllCancel} />
      <Button
        value={`${getCartTotalAmount(
          cartMenuList
        ).toLocaleString()}원 결제하기`}
        onClick={onClickPayButton}
      />
    </div>
  )
}
