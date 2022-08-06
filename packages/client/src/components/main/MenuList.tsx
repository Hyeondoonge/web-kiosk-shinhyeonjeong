import { MenuType } from 'type'

interface MenuItemProps {
  isPopular: boolean
  menu: MenuType
}

function MenuListItem({
  isPopular,
  menu: { id, name, price, imgUrl },
}: MenuItemProps) {
  return (
    <li>
      <div>{isPopular ? '인기' : '인기없음'}</div>
      <img src={imgUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
    </li>
  )
}

interface MenuListProps {
  menuList: MenuType[]
}

export function MenuList({ menuList }: MenuListProps) {
  const popularMenuId = [...menuList].sort(
    (a, b) => b.totalSellCount - a.totalSellCount
  )[0].id

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
        />
      ))}
    </ul>
  )
}
