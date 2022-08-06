import { CategoryList } from 'components/main/CategoryList'
import React, { useEffect, useState } from 'react'
import mockCategory from 'mock/mockCategoryList.json'
import mockOption from 'mock/mockOptionList.json'
import mockSelectedMenu from 'mock/mockMySelectedMenu.json'
import mockOrder from 'mock/mockOrderedMenuList.json'

import { MenuList } from 'components/main/MenuList'
import {
  MenuAmount,
  MenuOptionSelector,
} from 'components/main/MenuOptionSelector'
import { Cart } from 'components/main/Cart'
import { PaymentMethodSelector } from 'components/main/PaymentMethodSelector'
import { LoadingIndicator } from 'components/main/LoadingIndicator'
import { CachePayment } from 'components/main/CachePayment'
import { Receipt } from 'components/main/Receipt'

function App() {
  return (
    <div className="App">
      <CategoryList
        categoryList={mockCategory}
        selectedCategoryId={mockCategory[0].id}
      />
      <MenuList menuList={mockCategory[0].menuList} />
      <MenuOptionSelector
        menu={mockCategory[0].menuList[0]}
        optionList={mockOption}
      />
      <Cart selectedMenuList={mockSelectedMenu} />
      <CachePayment />
      <Receipt order={mockOrder} />
    </div>
  )
}

export default App
