import { getCategory } from 'api/category'
import { getMenu } from 'api/menu'
import React, { createContext, useEffect, useState } from 'react'
import Cart from './Cart'
import CategoryList from './CategoryList'
import MenuList from './MenuList'
import { mock } from './mock'

// TODO: 타입 별도 파일로 분리, category.ts, Cart.ts에서 중복
interface CategoryProps {
  id: number
  name: string
  menuList: MenuProps[]
}

interface MenuProps {
  id: number
  name: string
}

interface SelectedMenuProps {
  categoryId: number
  menuId: number
  options: string
  count: number
  menuTotalPrice: number
}

export const CategoryListContext = createContext<CategoryProps[]>([])

export const SelectedMenuListContext = createContext<SelectedMenuProps[]>([])

export default function MainPage() {
  // hook
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([])
  const [selectedMenuList, setSelectedMenuList] = useState<SelectedMenuProps[]>(
    []
  )

  const initData = async () => {
    try {
      const response = await getCategory()
      if ('message' in response) {
        // Error
        throw new Error(response.message)
      }
      const categoryList = response
      setCategoryList(mock)
      // setCategoryList(categoryList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initData()
  }, [])

  // + MenuList 아이템 클릭 시 Selected Id가 변경되어서 Cart가 변경되어야함.
  // Cart에 있었던 selectedMenuIdList를 부모 컴포넌트로 끌어올림.

  const resetSelectedMenuList = () => {
    setSelectedMenuList([])
  }

  const deleteMenuFromCart = (menuId: number) => {
    const newSelectedMenuList = selectedMenuList.filter(
      ({ menuId: selectedMenuId }) => !(menuId === selectedMenuId)
    )

    setSelectedMenuList([...newSelectedMenuList])
  }

  return (
    <CategoryListContext.Provider value={categoryList}>
      <SelectedMenuListContext.Provider value={selectedMenuList}>
        <div>
          {categoryList.length > 0 && (
            <>
              <CategoryList
                categoryList={categoryList}
                selectedCategoryIndex={selectedCategoryIndex}
                setSelectedCategoryIndex={setSelectedCategoryIndex}
              />
              <MenuList selectedCategoryIndex={selectedCategoryIndex} />
            </>
          )}
          <h1>카트</h1>
          <Cart
            reset={resetSelectedMenuList}
            deleteMenuFromCart={deleteMenuFromCart}
          />
        </div>
        <button
          onClick={() => {
            setSelectedMenuList([
              ...selectedMenuList,
              {
                categoryId: 1,
                menuId: 4,
                options: '{"온도": "HOT", "샷 추가": "2SHOT"}',
                count: 2,
                menuTotalPrice: 6000,
              },
              {
                categoryId: 1,
                menuId: 5,
                options: '{"온도": "ICE"}',
                count: 1,
                menuTotalPrice: 3000,
              },
              {
                categoryId: 4,
                menuId: 10,
                options: '{"온도": "ICE"}',
                count: 5,
                menuTotalPrice: 18000,
              },
            ])
          }}
        >
          선택된 메뉴 아이디 추가!
        </button>
      </SelectedMenuListContext.Provider>
    </CategoryListContext.Provider>
  )
}
