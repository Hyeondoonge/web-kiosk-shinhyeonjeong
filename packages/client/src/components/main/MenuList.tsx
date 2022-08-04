import React, { useContext } from 'react'
import { MenuListContext } from './MainPage'
import styled from 'styled-components'

export function MenuImage() {
  return <div>☕️</div>
}

export function MenuInfo({ name }: { name: string }) {
  return <div>{name} 4,000원</div>
}

export function Menu({ name }: { name: string }) {
  return (
    <div>
      <MenuImage />
      <MenuInfo name={name} />
    </div>
  )
}

export default function MenuList() {
  const menuList = useContext(MenuListContext)

  return (
    <StyledMenuList>
      {menuList.map(({ id, name }) => (
        <Menu key={id} name={name} />
      ))}
    </StyledMenuList>
  )
}

const StyledMenuList = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    width: 200px;
    height: 300px;
    font-size: large;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1px;
  }
`
