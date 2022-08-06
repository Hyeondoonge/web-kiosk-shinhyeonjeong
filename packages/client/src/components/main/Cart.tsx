import React, { useContext, useEffect, useRef, useState } from 'react'
import { MenuListContext, SelectedMenuListIdContext } from './MainPage'
import styled from 'styled-components'

export function Timer() {
  const selectedMenuListId = useContext(SelectedMenuListIdContext)
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

export function CancelButton() {
  return <button>전체 취소하기</button>
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
export function SelectedMenuList() {
  const menuList = useContext(MenuListContext)
  const selectedMenuIdList = useContext(SelectedMenuListIdContext)

  return (
    <StyledSelectedMenuList>
      {selectedMenuIdList.map((id) => {
        const menu = menuList.find(({ id: menuId }) => menuId === id)

        if (menu !== undefined) return <SelectedMenu key={id} menu={menu} />

        return ''
      })}
    </StyledSelectedMenuList>
  )
}

export default function Cart() {
  return (
    <StyledCart>
      <SelectedMenuList />
      <div className="border"></div>
      <Timer />
      <div className="button-container">
        <CancelButton />
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
