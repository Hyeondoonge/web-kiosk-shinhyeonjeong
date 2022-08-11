import { MouseEventHandler, useEffect, useState } from 'react'
import { MenuType, OptionWithDetailType, SelectedMenuType } from 'type'
import MenuOptionSelector from './MenuOptionSelector'
import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import theme from 'style/theme'

interface MenuItemProps {
  isPopular: boolean
  menu: MenuType
  updateCartMenuList: (selectedMenu: SelectedMenuType) => void
}

function MenuListItem({ isPopular, menu, updateCartMenuList }: MenuItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const { id, name, price, imgUrl } = menu

  return (
    <StyledMenuListItem onClick={() => setIsModalOpen(true)}>
      {/* <div>{isPopular ? '인기' : '인기없음'}</div> */}
      <img src={imgUrl} alt={name} />
      <div className="menuName">{name}</div>
      <div className="menuPrice">{price.toLocaleString()}원</div>

      {isModalOpen && (
        <ModalPortal closeModal={closeModal}>
          <button onClick={closeModal}>닫기</button>
          <MenuOptionSelector
            menu={menu}
            setIsModalOpen={setIsModalOpen}
            updateCartMenuList={(selectedMenu: SelectedMenuType) => {
              updateCartMenuList(selectedMenu)
            }}
          />
        </ModalPortal>
      )}
    </StyledMenuListItem>
  )
}

interface MenuListProps {
  menuList: MenuType[]
  updateCartMenuList: (selectedMenu: SelectedMenuType) => void
}

export default function MenuList({
  menuList,
  updateCartMenuList,
}: MenuListProps) {
  const popularMenuId =
    [...menuList].sort((a, b) => b.totalSellCount - a.totalSellCount)[0]?.id ??
    -1

  const sortedMenuList = [...menuList].sort(
    (a, b) => b.todaySellCount - a.todaySellCount
  )

  return (
    <StyledMenuList>
      {sortedMenuList.map((menu) => (
        <MenuListItem
          key={menu.id}
          menu={menu}
          isPopular={popularMenuId === menu.id}
          updateCartMenuList={updateCartMenuList}
        />
      ))}
    </StyledMenuList>
  )
}

const StyledMenuList = styled.ul`
  display: flex;
  align-items: flex-start;
  padding: 5px;
  gap: 5px;
  flex-wrap: wrap;
  overflow: auto;
  background-color: ${theme.palette.background};
`

const StyledMenuListItem = styled.li`
  width: calc(100% / 3 - 4px);
  aspect-ratio: 1 / 1;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 50px;
  align-items: center;

  img {
    width: 100%;
  }
  font-size: ${theme.font.sm};
`
