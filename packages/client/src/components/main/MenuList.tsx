import { MouseEventHandler, useState } from 'react'
import { MenuType, SelectedMenuType } from 'type'
import MenuOptionSelector from './MenuOptionSelector'
import ModalPortal from './ModalPortal'
import mockOptionList from '../../mock/mockOptionList.json'

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
    <li onClick={() => setIsModalOpen(true)}>
      <div>{isPopular ? '인기' : '인기없음'}</div>
      <img src={imgUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>

      {isModalOpen && (
        <ModalPortal closeModal={closeModal}>
          <button onClick={closeModal}>닫기</button>
          <MenuOptionSelector
            menu={menu}
            optionList={mockOptionList} // menu를 전달해서 optionSelector에서 option가져오도록 수정
            setIsModalOpen={setIsModalOpen}
            updateCartMenuList={(selectedMenu: SelectedMenuType) => {
              updateCartMenuList(selectedMenu)
            }}
          />
        </ModalPortal>
      )}
    </li>
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
    <ul>
      {sortedMenuList.map((menu) => (
        <MenuListItem
          key={menu.id}
          menu={menu}
          isPopular={popularMenuId === menu.id}
          updateCartMenuList={updateCartMenuList}
        />
      ))}
    </ul>
  )
}
