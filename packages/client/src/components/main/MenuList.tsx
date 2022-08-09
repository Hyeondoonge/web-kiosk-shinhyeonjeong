import { MouseEventHandler } from 'react'
import { MenuType } from 'type'

interface MenuItemProps {
  isPopular: boolean
  menu: MenuType
  onClick: MouseEventHandler<HTMLLIElement>
}

function MenuListItem({
  isPopular,
  menu: { id, name, price, imgUrl },
  onClick,
}: MenuItemProps) {
  return (
    <li onClick={onClick}>
      <div>{isPopular ? '인기' : '인기없음'}</div>
      <img src={imgUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
    </li>
  )
}

interface MenuListProps {
  menuList: MenuType[]
  onClick: MouseEventHandler<HTMLLIElement>
}

export default function MenuList({ menuList, onClick }: MenuListProps) {
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
          onClick={onClick}
        />
      ))}
    </ul>
  )
}
