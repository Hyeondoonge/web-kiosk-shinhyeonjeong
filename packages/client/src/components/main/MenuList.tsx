import React, { useContext } from 'react'
import { MenuListContext } from './MainPage'

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
    <div>
      {menuList.map(({ id, name }) => (
        <Menu key={id} name={name} />
      ))}
    </div>
  )
}
