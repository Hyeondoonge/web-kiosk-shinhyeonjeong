import { useEffect, useRef, useState } from 'react'
import { SelectedMenuType } from 'type'

interface CartProps {
  selectedMenuList: SelectedMenuType[]
  deleteAllSelectedMenu: () => void
}

interface SelectedMenuListProps {
  selectedMenuList: SelectedMenuType[]
}

interface ButtonProps {
  value: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function SelectedMenuList({ selectedMenuList }: SelectedMenuListProps) {
  const totalAmount = (selectedMenuWithOption: SelectedMenuType) => {
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
      {selectedMenuList.map((selectedMenu, index) => {
        const { id, name, price, selectedOptionList, amount } = selectedMenu

        return (
          <li key={id}>
            <button>X</button>
            <div>{name}</div>
            <div>{totalAmount(selectedMenu).toLocaleString()}원</div>
            <div>
              {selectedOptionList
                .map(({ optionDetail }) => optionDetail.name)
                .join(', ')}
            </div>
            <div>{amount}개</div>
          </li>
        )
      })}
    </ul>
  )
}

interface TimerProps {
  selectedMenuList: SelectedMenuType[]
  deleteAllSelectedMenu: () => void
}

function Timer({ selectedMenuList, deleteAllSelectedMenu }: TimerProps) {
  const INITIAL_LEFT_TIME = 10
  const [leftTime, setLeftTime] = useState<number>(INITIAL_LEFT_TIME)
  const interval = useRef<any>(null)

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
    setLeftTime(INITIAL_LEFT_TIME)

    if (selectedMenuList.length === 0) return

    // + 담긴 상품이 없을 때는 실행되지 않도록 할 수도 있음.
    interval.current = setInterval(() => {
      setLeftTime((leftTime) => leftTime - 1)
    }, 1000)
  }, [selectedMenuList])

  useEffect(() => {
    if (leftTime === 0) {
      clearInterval(interval.current)
      deleteAllSelectedMenu()
    }
  }, [leftTime])

  return <div>{leftTime}초</div>
}

function Button({ onClick, value }: ButtonProps) {
  return <button onClick={onClick}>{value}</button>
}

export default function Cart({
  selectedMenuList,
  deleteAllSelectedMenu,
}: CartProps) {
  const onClickAllCancel = () => {
    deleteAllSelectedMenu()
  }

  const onClickPayButton = () => {
    console.log('open modal')
  }

  const totalAmount = (selectedMenuList: SelectedMenuType[]) => {
    let priceAllMenu = 0

    for (const selectedMenu of selectedMenuList) {
      let pricePerMenuWithOption = 0
      pricePerMenuWithOption += selectedMenu.price
      for (const selectedOption of selectedMenu.selectedOptionList) {
        pricePerMenuWithOption += selectedOption.optionDetail.price
      }
      pricePerMenuWithOption *= selectedMenu.amount
      priceAllMenu += pricePerMenuWithOption
    }

    return priceAllMenu
  }

  return (
    <div>
      <SelectedMenuList selectedMenuList={selectedMenuList} />
      <Timer
        selectedMenuList={selectedMenuList}
        deleteAllSelectedMenu={deleteAllSelectedMenu}
      />
      <Button value="전체 취소" onClick={onClickAllCancel} />
      <Button
        value={`${totalAmount(selectedMenuList).toLocaleString()}원 결제하기`}
        onClick={onClickPayButton}
      />
    </div>
  )
}
