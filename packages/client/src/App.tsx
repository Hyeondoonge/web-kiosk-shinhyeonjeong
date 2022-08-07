import Cart from 'components/main/Cart'
import CategoryList from 'components/main/CategoryList'
import MenuList from 'components/main/MenuList'
import MenuOptionSelector from 'components/main/MenuOptionSelector'
import React, { useEffect, useState } from 'react'
import { CategoryType, MenuType, SelectedMenuType } from 'type'
import mock from './mock/mockCategoryList.json'
import mockOptionList from './mock/mockOptionList.json'

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [menuList, setMenuList] = useState<MenuType[]>([])
  const [selectedMenuList, setSelectedMenuList] = useState<SelectedMenuType[]>(
    []
  )

  useEffect(() => {
    setCategoryList(mock)
  }, [])

  const updateSelectedCategoryId = (newSelectedCategoryId: number) => {
    setSelectedCategoryId(newSelectedCategoryId)
    setMenuList(
      categoryList.filter(({ id }) => id === newSelectedCategoryId)[0].menuList
    )
  }

  return (
    <div className="App">
      <CategoryList
        categoryList={categoryList}
        selectedCategoryId={selectedCategoryId}
      />
      <MenuList menuList={menuList} />
      <MenuOptionSelector
        menu={mock[0].menuList[0]}
        optionList={mockOptionList}
      />
    </div>
  )
}

export default App
