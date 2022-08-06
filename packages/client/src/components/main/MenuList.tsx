import React, { useContext } from 'react'
import { CategoryListContext } from './MainPage'
import styled from 'styled-components'

interface MenuProps {
  name: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function MenuImage() {
  return <div>☕️</div>
}

export function MenuInfo({ name }: { name: string }) {
  return <div>{name} 4,000원</div>
}

export function Menu({ name, onClick }: MenuProps) {
  return (
    <div onClick={onClick}>
      <MenuImage />
      <MenuInfo name={name} />
    </div>
  )
}

interface SelectedMenuProps {
  categoryId: number
  menuId: number
  options: string
  count: number
  menuTotalPrice: number
}

export default function MenuList({
  selectedCategoryIndex,
}: {
  selectedCategoryIndex: number
}) {
  const categoryList = useContext(CategoryListContext)

  const onClickMenu = () => {
    console.log('메뉴 담기 모달 생성!')
  }

  return (
    <StyledMenuList>
      {categoryList[selectedCategoryIndex].menuList.map(({ id, name }) => (
        <Menu key={id} name={name} onClick={() => onClickMenu()} />
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
