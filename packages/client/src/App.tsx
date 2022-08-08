import CachePayment from 'components/main/CachePayment'
import Cart from 'components/main/Cart'
import CategoryList from 'components/main/CategoryList'
import MenuList from 'components/main/MenuList'
import MenuOptionSelector from 'components/main/MenuOptionSelector'
import Receipt from 'components/main/Receipt'
import React, { useEffect, useState } from 'react'
import { CategoryType, MenuType, SelectedMenuType } from 'type'
import mock from './mock/mockCategoryList.json'
import mockOptionList from './mock/mockOptionList.json'
import order from './mock/mockOrderedMenuList.json'

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [selectedMenuList, setSelectedMenuList] = useState<SelectedMenuType[]>(
    []
  )
  useEffect(() => {
    setCategoryList(mock)
  }, [])

  const updateSelectedCategoryId = (newSelectedCategoryId: number) => {
    setSelectedCategoryId(newSelectedCategoryId)
  }

  const updateSelectedMenuList = (selectedMenu: SelectedMenuType) => {
    const newSelectedMenuList = [...selectedMenuList]
    newSelectedMenuList.push(selectedMenu)
    setSelectedMenuList(newSelectedMenuList)
  }

  const deleteAllSelectedMenu = () => {
    setSelectedMenuList([])
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
        selectedMenuList={selectedMenuList}
        deleteAllSelectedMenu={deleteAllSelectedMenu}
      />
      <MenuOptionSelector
        menu={mock[0].menuList[0]}
        optionList={mockOptionList}
        updateSelectedMenuList={updateSelectedMenuList}
      />
      <div>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</div>
      <Receipt order={order} />
    </div>
  )
}

export default App
