import React, { createContext, useEffect, useState } from 'react'
import Cart from './Cart'
import CategoryList from './CategoryList'
import MenuList from './MenuList'

// TODO: 타입 별도 파일로 분리
interface CategoryProps {
  id: number
  name: string
}

interface MenuProps {
  id: number
  name: string
}

export const MenuListContext = createContext<
  {
    id: number
    name: string
  }[]
>([])

export const SelectedMenuListIdContext = createContext<number[]>([])

export default function MainPage() {
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([])
  const [menuList, setMenuList] = useState<MenuProps[]>([])
  const [selectedMenuIdList, setSelectedMenuIdList] = useState([2, 5])

  useEffect(() => {
    setMenuList([
      { id: 1, name: '아메리카노' },
      { id: 2, name: '콜드브루' },
      { id: 3, name: '헤이즐넛 라떼' },
      { id: 4, name: '돌체라떼' },
      { id: 5, name: '초콜릿 라떼' },
    ])
    setCategoryList([
      { id: 1, name: '커피' },
      { id: 2, name: '라떼' },
    ])
  }, [])

  // + MenuList 아이템 클릭 시 Selected Id가 변경되어서 Cart가 변경되어야함.
  // Cart에 있었던 selectedMenuIdList를 부모 컴포넌트로 끌어올림.

  return (
    <MenuListContext.Provider value={menuList}>
      <SelectedMenuListIdContext.Provider value={selectedMenuIdList}>
        <div>
          <CategoryList categoryList={categoryList} />
          <MenuList />
          <h1>카트</h1>
          <Cart />
        </div>
        <button
          onClick={() => {
            if (selectedMenuIdList.find((id) => id === 3)) {
              setSelectedMenuIdList([...selectedMenuIdList, 1])
            } else setSelectedMenuIdList([...selectedMenuIdList, 3])
          }}
        >
          선택된 메뉴 아이디 추가!
        </button>
      </SelectedMenuListIdContext.Provider>
    </MenuListContext.Provider>
  )
}
