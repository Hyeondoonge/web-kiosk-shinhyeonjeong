import { CartMenuType } from 'type'

export const cartTotalAmount = (cartMenuList: CartMenuType[]) => {
  let priceAllMenu = 0

  for (const selectedMenu of cartMenuList) {
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
