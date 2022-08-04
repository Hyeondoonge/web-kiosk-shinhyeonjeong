import React, { useContext, useEffect, useState } from 'react'
import { MenuListContext, SelectedMenuListIdContext } from './MainPage'
import styled from 'styled-components'

export function Timer() {
  return <div>60초</div>
}

export function CancelButton() {
  return <button>전체 취소하기</button>
}

export function PayButton() {
  return <button>결제하기</button>
}

const StyledSelectedMenu = styled.div`
  display: flex;
  gap: 10px;
`

export function SelectedMenu({ menu }: { menu: { id: number; name: string } }) {
  return (
    <StyledSelectedMenu>
      <div>{menu?.name ?? ''}</div>
      <div>- 1개 +</div>
      <button>취소</button>
    </StyledSelectedMenu>
  )
}

const StyledSelectedMenuList = styled.div`
  display: flex;
  flex-direction: column;

  & .border {
    width: 1px;
    background-color: gray;
  }
`

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
