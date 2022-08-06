import { getCategory } from 'api/category'
import { getMenu } from 'api/menu'
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

  const initData = async () => {
    try {
      let response = await getCategory()
      if ('message' in response) {
        // Error
        throw new Error(response.message)
      }
      const categoryList = response
      setCategoryList(categoryList)

      const categoryId = categoryList[0].id

      response = await getMenu(categoryId)
      if ('message' in response) {
        // Error
        throw new Error(response.message)
      }

      const menuList = response
      console.log(menuList)
      setMenuList(menuList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initData()
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
