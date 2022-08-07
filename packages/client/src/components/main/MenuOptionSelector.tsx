import { MenuType, OptionType, OptionWithDetailType } from 'type'
import { AmountController } from './AmountController'
import { MenuOptionList } from './MenuOptionList'

function Menu({ menu: { imgUrl, name, price } }: { menu: MenuType }) {
  return (
    <div>
      <img src={imgUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
    </div>
  )
}

function AddButton() {
  return <button>500원 담기</button>
}

export function MenuAmount() {
  return (
    <div>
      수량 <AmountController />
    </div>
  )
}

interface MenuOptionSelectorProps {
  menu: MenuType
  optionList: OptionWithDetailType[]
}

export function MenuOptionSelector({
  menu,
  optionList,
}: MenuOptionSelectorProps) {
  return (
    <div>
      <Menu menu={menu} />
      <MenuOptionList optionList={optionList} />
      <MenuAmount />
      <AddButton />
    </div>
  )
}
