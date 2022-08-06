import React, { useContext, useEffect, useRef, useState } from 'react'
import { CategoryListContext, SelectedMenuListContext } from './MainPage'
import styled from 'styled-components'

export function Timer() {
  const selectedMenuListId = useContext(SelectedMenuListContext)
  const INITIAL_LEFT_TIME = 10
  const [leftTime, setLeftTime] = useState<number>(INITIAL_LEFT_TIME)
  const interval = useRef<any>(null)

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
    setLeftTime(INITIAL_LEFT_TIME)

    // + 담긴 상품이 없을 때는 실행되지 않도록 할 수도 있음.
    interval.current = setInterval(() => {
      setLeftTime((leftTime) => leftTime - 1)
    }, 1000)
  }, [selectedMenuListId])

  useEffect(() => {
    if (leftTime === 0) {
      // 모든 결제 취소
      clearInterval(interval.current)
    }
  }, [leftTime])

  return <div>{leftTime}초</div>
}

export function CancelButton({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return <button onClick={onClick}>전체 취소하기</button>
}

export function PayButton() {
  return <button>결제하기</button>
}

export function SelectedMenu({ menu }: { menu: { id: number; name: string } }) {
  return (
    <StyledSelectedMenu>
      <div>{menu?.name ?? ''}</div>
      <div>- 1개 +</div>
      <button>취소</button>
    </StyledSelectedMenu>
  )
}

interface CategoryProps {
  id: number
  name: string
  menuList: MenuProps[]
}

interface MenuProps {
  id: number
  name: string
}

export function SelectedMenuList() {
  const categoryList = useContext(CategoryListContext)
  const selectedMenuList = useContext(SelectedMenuListContext)

  console.log(selectedMenuList)

  return (
    <StyledSelectedMenuList>
      {selectedMenuList.map(({ categoryId, menuId }) => {
        const category = categoryList.find(({ id }) => categoryId === id)

        console.log(category)
        const menu = (category as CategoryProps).menuList.find(
          ({ id }) => menuId === id
        ) as MenuProps

        return <SelectedMenu key={`${categoryId}${menuId}`} menu={menu} />
      })}
    </StyledSelectedMenuList>
  )
}

export default function Cart({ reset }: { reset: () => void }) {
  return (
    <StyledCart>
      <SelectedMenuList />
      <div className="border"></div>
      <Timer />
      <div className="button-container">
        <CancelButton
          onClick={() => {
            reset()
          }}
        />
        <PayButton />
      </div>
    </StyledCart>
  )
}

const StyledSelectedMenu = styled.div`
  display: flex;
  gap: 10px;
`

const StyledSelectedMenuList = styled.div`
  display: flex;
  flex-direction: column;

  & .border {
    width: 1px;
    background-color: gray;
  }
`

const StyledCart = styled.div`
  display: grid;
  grid-template-columns: 60% 5% 10% 25%;

  & .border {
    width: 1px;
    background-color: gray;
  }

  & .button-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`
