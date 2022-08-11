import { ModalContext } from 'App'
import { getCartTotalAmount } from 'components/util'
import { useContext, useEffect, useRef, useState } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'
import { CartMenuType, SelectedMenuType } from 'type'
import AmountController from './AmountController'
import { IoRemoveOutline } from 'react-icons/io5'
import Button from 'components/common/Button'
import { CacheButtonList } from './CachePayment'

interface CartProps {
  cartMenuList: CartMenuType[]
  updateCartMenuList: (newSelectedMenuList: CartMenuType[]) => void
  deleteAllCartMenu: () => void
}

interface CartMenuListProps {
  cartMenuList: CartMenuType[]
  updateCartMenuList: (newSelectedMenuList: CartMenuType[]) => void
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
    <StyledCartMenuList>
      {cartMenuList.map((cartMenu, index) => {
        const { cartId, id, name, price, selectedOptionList, amount } = cartMenu

        return (
          <StyledCartMenu key={cartId}>
            <div className="menu">
              <div>{name}</div>
              <div>{totalAmount(cartMenu).toLocaleString()}원</div>
              <div>
                (
                {selectedOptionList
                  .map(({ optionDetail }) => optionDetail.name)
                  .join(', ')}
                )
              </div>
            </div>
            <div className="controller">
              <AmountController
                amount={amount}
                updateAmount={(newAmount) => {
                  const newCartMenuList = [...cartMenuList]
                  newCartMenuList[index].amount = newAmount
                  updateCartMenuList(newCartMenuList)
                }}
              />
              <button
                onClick={() => {
                  const newSelectedMenuList = [...cartMenuList].filter(
                    ({ cartId: deleteCartId }) => cartId !== deleteCartId
                  )

                  updateCartMenuList(newSelectedMenuList)
                }}
              >
                <IoRemoveOutline />
              </button>
            </div>
          </StyledCartMenu>
        )
      })}
    </StyledCartMenuList>
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
      setLeftTime((leftTime) => leftTime - 1)
    }, 1000)
  }, [cartMenuList])

  useEffect(() => {
    if (leftTime === 0) {
      clearInterval(interval.current)
      deleteAllCartMenu()
    }
  }, [leftTime])

  return <StyledTimer>남은시간 {leftTime}초</StyledTimer>
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

  const amountText = () => {
    const amount = getCartTotalAmount(cartMenuList)

    return amount === 0 ? '' : `${amount.toLocaleString()}원`
  }

  return (
    <StyledCart>
      <CartMenuList
        cartMenuList={cartMenuList}
        updateCartMenuList={updateCartMenuList}
      />
      <div>
        <Timer
          cartMenuList={cartMenuList}
          deleteAllCartMenu={deleteAllCartMenu}
        />
        <Button onClick={onClickAllCancel} background={theme.palette.warning}>
          전체취소
        </Button>
        <Button onClick={onClickPayButton}>{amountText()}결제하기</Button>
      </div>
    </StyledCart>
  )
}

const StyledCart = styled.div`
  display: grid;
  grid-template-columns: 65% 30%;
  background-color: white;
  overflow: auto;
  padding: 10px;
  gap: 5%;
`

const StyledCartMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: ${theme.font.xs};
  gap: 10px;
`

const StyledCartMenu = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px ${theme.palette.background};

  .menu {
    display: flex;
    gap: 5px;
  }

  .controller {
    display: flex;
    gap: 5px;
  }
`

const StyledTimer = styled.div`
  font-size: ${theme.font.md};
  font-weight: 700;
`
