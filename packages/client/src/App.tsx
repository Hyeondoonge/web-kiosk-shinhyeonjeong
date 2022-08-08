import CachePayment from 'components/main/CachePayment'
import Cart from 'components/main/Cart'
import CategoryList from 'components/main/CategoryList'
import MenuList from 'components/main/MenuList'
import MenuOptionSelector from 'components/main/MenuOptionSelector'
import Receipt from 'components/main/Receipt'
import { cartTotalAmount } from 'components/util'
import React, { useEffect, useState } from 'react'
import { CartMenuType, CategoryType, MenuType, SelectedMenuType } from 'type'
import mock from './mock/mockCategoryList.json'
import mockOptionList from './mock/mockOptionList.json'
import order from './mock/mockOrderedMenuList.json'

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [cartMenuList, setCartMenuList] = useState<CartMenuType[]>([])
  useEffect(() => {
    setCategoryList(mock)
  }, [])

  const updateSelectedCategoryId = (newSelectedCategoryId: number) => {
    setSelectedCategoryId(newSelectedCategoryId)
  }

  const updateSelectedMenuList = (selectedMenu: SelectedMenuType) => {
    const newSelectedMenuList = [...cartMenuList]

    // id 달아주기
    const cartMenu: CartMenuType = {
      cartId: new Date().getTime(),
      ...selectedMenu,
    }
    newSelectedMenuList.push(cartMenu)
    setCartMenuList(newSelectedMenuList)
  }

  const deleteAllCartMenu = () => {
    setCartMenuList([])
  }

  const menuList =
    categoryList.filter(({ id }) => id === selectedCategoryId)[0]?.menuList ??
    []

  return (
    <div className="App">
      <CategoryList
        categoryList={categoryList}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <MenuList menuList={menuList} />
      <div>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</div>
      <Cart
        cartMenuList={cartMenuList}
        updateCartMenuList={(newCartMenuList) => {
          setCartMenuList(newCartMenuList)
        }}
        deleteAllCartMenu={deleteAllCartMenu}
      />
      <MenuOptionSelector
        menu={mock[0].menuList[0]}
        optionList={mockOptionList}
        updateSelectedMenuList={updateSelectedMenuList}
      />
      <div>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</div>
      <Receipt order={order} deleteAllCartMenu={deleteAllCartMenu} />
      <CachePayment orderAmount={cartTotalAmount(cartMenuList)} />
    </div>
  )
}

export default App
