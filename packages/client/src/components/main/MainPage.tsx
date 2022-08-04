import React, { createContext } from 'react'
import Cart from './Cart'
import CategoryList from './CategoryList'
import MenuList from './MenuList'

// TODO: 타입 별도 파일로 분리

export const MenuListContext = createContext<
  {
    id: number
    name: string
  }[]
>([])

export const SelectedMenuListIdContext = createContext<number[]>([])

export default function MainPage() {
  const categoryList = [
    { id: 1, name: '커피' },
    { id: 2, name: '라떼' },
  ]

  const menuList = [
    { id: 1, name: '아메리카노' },
    { id: 2, name: '콜드브루' },
    { id: 3, name: '헤이즐넛 라떼' },
    { id: 4, name: '돌체라떼' },
    { id: 5, name: '초콜릿 라떼' },
  ]

  // + MenuList 아이템 클릭 시 Selected Id가 변경되어서 Cart가 변경되어야함.
  // Cart에 있었던 selectedMenuIdList를 부모 컴포넌트로 끌어올림.
  const selectedMenuIdList = [2, 5]

  return (
    <MenuListContext.Provider value={menuList}>
      <SelectedMenuListIdContext.Provider value={selectedMenuIdList}>
        <div>
          <CategoryList categoryList={categoryList} />
          <MenuList />
          <h1>카트</h1>
          <Cart />
        </div>
      </SelectedMenuListIdContext.Provider>
    </MenuListContext.Provider>
  )
}
