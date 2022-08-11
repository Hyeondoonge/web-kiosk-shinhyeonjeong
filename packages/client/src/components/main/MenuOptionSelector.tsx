import { getOptionList } from 'api/options'
import Border from 'components/common/Border'
import Button from 'components/common/Button'
import { useEffect, useState } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'
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
  price: number
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface MenuOptionSelectorProps {
  menu: MenuType
  updateCartMenuList: (selectedMenu: SelectedMenuType) => void
  setIsModalOpen: (isModalOpen: boolean) => void
}

function Menu({ menu: { imgUrl, name, price } }: { menu: MenuType }) {
  return (
    <StyledMenu>
      <img src={imgUrl} alt={name} />
      <div>{name}</div>
      <div>{price.toLocaleString()}원</div>
    </StyledMenu>
  )
}

function AddButton({ onClick, price }: AddButtonProps) {
  return <Button onClick={onClick}>{price.toLocaleString()}원 담기</Button>
}

export function MenuAmount(props: MenuAmountProps) {
  return (
    <StyledMenuAmount>
      <div className="optionName">수량</div>
      <AmountController {...props} />
    </StyledMenuAmount>
  )
}

export default function MenuOptionSelector({
  menu,
  updateCartMenuList,
  setIsModalOpen,
}: MenuOptionSelectorProps) {
  const [optionList, setOptionList] = useState<OptionWithDetailType[]>([])
  const [selectedOptionList, setSelectedOptionList] = useState<
    SelectedOptionType[]
  >([])
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
      selectedOptionList: selectedOptionList.map((selectedOption) => ({
        ...selectedOption,
      })),
      amount,
    }
    // 장바구니 업데이트
    setIsModalOpen(false)
    updateCartMenuList(selectedMenu)
  }

  const totalPrice = (selectedMenuWithOption: SelectedMenuType) => {
    const { price, amount, selectedOptionList } = selectedMenuWithOption
    let sum = 0

    for (const selectedOption of selectedOptionList) {
      sum += selectedOption.optionDetail.price
    }

    sum += price

    return sum * amount
  }

  const initOptionList = async () => {
    const response = await getOptionList(menu.id)

    if (response instanceof Error) {
      return
    }
    const optionList = response
    setOptionList(optionList)

    const INITIAL_SELECTED_OPTIONLIST = optionList.map(
      ({ id, name, optionDetailList }) => ({
        id,
        name,
        optionDetail: optionDetailList[0],
      })
    )
    setSelectedOptionList(INITIAL_SELECTED_OPTIONLIST)
  }

  useEffect(() => {
    initOptionList()
  }, [])

  return (
    <StyledMenuOptionSelector>
      <Menu menu={menu} />
      <MenuOptionList
        optionList={optionList}
        selectedOptionList={selectedOptionList}
        updateSelectedOption={updateSelectedOption}
      />
      <Border />
      <MenuAmount amount={amount} updateAmount={setAmount} />
      <AddButton
        onClick={onClickAddButton}
        price={totalPrice({ ...menu, selectedOptionList, amount })}
      />
    </StyledMenuOptionSelector>
  )
}

const StyledMenuOptionSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: ${theme.font.sm};
`

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  img {
    width: 70%;
  }
`

const StyledMenuAmount = styled.div`
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .optionName {
    font-weight: 600;
  }
`
