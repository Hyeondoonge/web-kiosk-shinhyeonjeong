import { ModalContext } from 'App'
import { getCartTotalAmount } from 'components/util'
import { useContext, useEffect, useRef, useState } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'
import { CartMenuType, SelectedMenuType } from 'type'
import AmountController from './AmountController'
import { IoRemoveOutline } from 'react-icons/io5'

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
  background?: string
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
      // setLeftTime((leftTime) => leftTime - 1)
    }, 1000)
  }, [cartMenuList])

  useEffect(() => {
    if (leftTime === 0) {
      clearInterval(interval.current)
      deleteAllCartMenu()
    }
  }, [leftTime])

  return <StyledTimer>{leftTime}초</StyledTimer>
}

function Button({ onClick, value, background }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} background={background}>
      {value}
    </StyledButton>
  )
}

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
        <Button
          value="전체 취소"
          onClick={onClickAllCancel}
          background={theme.palette.warning}
        />
        <Button
          value={`${getCartTotalAmount(
            cartMenuList
          ).toLocaleString()}원 결제하기`}
          onClick={onClickPayButton}
        />
      </div>
    </StyledCart>
  )
}

const StyledCart = styled.div`
  display: grid;
  grid-template-columns: 65% 30%;
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
  font-size: ${theme.font.lg};
  font-weight: 700;
`

const StyledButton = styled.button<{ background?: string }>`
  width: 100%;
  background-color: ${(props) => props.background || theme.palette.primary1};
  padding: 1rem 3rem;
  color: ${theme.palette.offWhite};
  font-weight: 500;
  font-size: ${theme.font.sm};

  margin: 10px 0;
  border-radius: 4px;
`
