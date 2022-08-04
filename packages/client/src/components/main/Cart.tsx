import React, { useContext } from 'react'
import { MenuListContext, SelectedMenuListIdContext } from './MainPage'

export function Timer() {
  return <div>70초</div>
}

export function CancelButton() {
  return <button>전체 취소하기</button>
}

export function PayButton() {
  return <button>결제하기</button>
}

export function SelectedMenuList() {
  const menuList = useContext(MenuListContext)
  const selectedMenuIdList = useContext(SelectedMenuListIdContext)

  return (
    <div>
      {selectedMenuIdList.map((id) => {
        const menu = menuList.find(({ id: menuId }) => menuId === id)

        return (
          <div key={id}>
            <div>{menu?.name ?? ''}</div>
            <div>- +</div>
            <button>취소</button>
          </div>
        )
      })}
    </div>
  )
}

export default function Cart() {
  return (
    <div>
      🧺 장바구니
      <SelectedMenuList />
      <Timer />
      <CancelButton />
      <PayButton />
    </div>
  )
}
