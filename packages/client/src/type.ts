export interface CategoryType {
  id: number
  name: string
  menuList: MenuType[]
}

export interface MenuType {
  id: number
  name: string
  price: number
  imgUrl: string
  totalSellCount: number
  todaySellCount: number
}

export interface OptionDetailType {
  id: number
  name: string
  price: number
}

export interface OptionType {
  id: number
  name: string
}

export interface OptionWithDetailType extends OptionType {
  optionDetailList: OptionDetailType[]
}

export interface SelectedOptionType extends OptionType {
  optionDetail: OptionDetailType
}

export interface SelectedMenuType extends MenuType {
  selectedOptionList: SelectedOptionType[]
  amount: number
}

export interface OrderType {
  id: number
  orderNumber: number
  selectedMenuList: SelectedMenuType[]
  paymentMethod: string
  paymentAmount: number
}
