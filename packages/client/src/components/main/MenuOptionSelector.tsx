import { useEffect, useState } from 'react'
import {
  MenuType,
  OptionType,
  OptionWithDetailType,
  SelectedMenuType,
  SelectedOptionType,
} from 'type'
import AmountController from './AmountController'
import MenuOptionList from './MenuOptionList'

interface MenuAmountProps {
  amount: number
  updateAmount: (amount: number) => void
}

interface AddButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface MenuOptionSelectorProps {
  menu: MenuType
  optionList: OptionWithDetailType[]
}

function Menu({ menu: { imgUrl, name, price } }: { menu: MenuType }) {
  return (
    <div>
      <img src={imgUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
    </div>
  )
}

function AddButton({ onClick }: AddButtonProps) {
  return <button onClick={onClick}>500원 담기</button>
}
export function MenuAmount(props: MenuAmountProps) {
  return (
    <div>
      수량 <AmountController {...props} />
    </div>
  )
}

export default function MenuOptionSelector({
  menu,
  optionList,
}: MenuOptionSelectorProps) {
  const INITIAL_SELECTED_OPTIONLIST = optionList.map(
    ({ id, name, optionDetailList }) => ({
      id,
      name,
      optionDetail: optionDetailList[0],
    })
  )

  const [selectedOptionList, setSelectedOptionList] = useState<
    SelectedOptionType[]
  >(INITIAL_SELECTED_OPTIONLIST)

  const [amount, setAmount] = useState(1)

  const updateSelectedOption = (newSelectedOption: SelectedOptionType) => {
    const newSelectedOptionList = [...selectedOptionList]

    for (const selectedOption of newSelectedOptionList) {
      if (selectedOption.id === newSelectedOption.id) {
        selectedOption.optionDetail = newSelectedOption.optionDetail
      }
    }
    setSelectedOptionList(newSelectedOptionList)
  }

  const onClickAddButton = () => {
    const selectedMenu: SelectedMenuType = {
      ...menu,
      selectedOptionList,
      amount,
    }
    // 장바구니 업데이트
    console.log(selectedMenu)
  }

  return (
    <div>
      <Menu menu={menu} />
      <MenuOptionList
        optionList={optionList}
        selectedOptionList={selectedOptionList}
        updateSelectedOption={updateSelectedOption}
      />
      <MenuAmount amount={amount} updateAmount={setAmount} />
      <AddButton onClick={onClickAddButton} />
    </div>
  )
}
