import { SelectedMenuType } from 'type'

interface CartProps {
  selectedMenuList: SelectedMenuType[]
}

interface SelectedMenuListProps {
  selectedMenuList: SelectedMenuType[]
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
      {selectedMenuList.map((selectedMenu) => {
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

function Timer() {
  return <div>시계 10초</div>
}

function Button({ value }: { value: string }) {
  return <button>{value}</button>
}

export function Cart({ selectedMenuList }: CartProps) {
  return (
    <div>
      <SelectedMenuList selectedMenuList={selectedMenuList} />
      <Timer />
      <Button value="전체 취소" />
      <Button value="15000원 결제하기" />
    </div>
  )
}