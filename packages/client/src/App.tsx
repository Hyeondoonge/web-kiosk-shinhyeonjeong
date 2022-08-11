import { getCategories } from 'api/categories'
import CachePayment from 'components/main/CachePayment'
import Cart from 'components/main/Cart'
import CategoryList from 'components/main/CategoryList'
import LoadingIndicator from 'components/main/LoadingIndicator'
import MenuList from 'components/main/MenuList'
import MenuOptionSelector from 'components/main/MenuOptionSelector'
import ModalPortal from 'components/main/ModalPortal'
import PaymentMethodSelector from 'components/main/PaymentMethodSelector'
import Receipt from 'components/main/Receipt'
import { getCartTotalAmount } from 'components/util'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from 'react'
import { CartMenuType, CategoryType, MenuType, SelectedMenuType } from 'type'
import order from './mock/mockOrderedMenuList.json'

type ModalOpenState = {
  paymentMethod: boolean
  cachePayment: boolean
  loading: boolean
  receipt: boolean
}

export const ModalContext = createContext<
  [ModalOpenState, React.Dispatch<React.SetStateAction<ModalOpenState>>] | []
>([])

export const CartContext = createContext<
  [CartMenuType[], React.Dispatch<React.SetStateAction<CartMenuType[]>>] | []
>([])

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [cartMenuList, setCartMenuList] = useState<CartMenuType[]>([])

  const initCategories = async () => {
    const response = await getCategories()

    if (response instanceof Error) {
      return
    }
    const categoryList = response
    setCategoryList(categoryList)
    setSelectedCategoryId(categoryList[0].id)
  }

  useEffect(() => {
    initCategories()
  }, [])

  const updateSelectedCategoryId = (newSelectedCategoryId: number) => {
    setSelectedCategoryId(newSelectedCategoryId)
  }

  const updateSelectedMenuList = (selectedMenu: SelectedMenuType) => {
    const newSelectedMenuList = [...cartMenuList]

    // id 달아주기
    const cartMenu: CartMenuType = {
      cartId: new Date().getTime(),
      ...selectedMenu,
    }
    newSelectedMenuList.push(cartMenu)
    setCartMenuList(newSelectedMenuList)
  }

  const deleteAllCartMenu = () => {
    setCartMenuList([])
  }

  const [isModalOpen, setIsModalOpen] = useState<ModalOpenState>({
    paymentMethod: false,
    cachePayment: false,
    loading: false,
    receipt: false,
  })

  const menuList =
    categoryList.filter(({ id }) => id === selectedCategoryId)[0]?.menuList ??
    []

  // 모달 상태 관리
  return (
    <ModalContext.Provider value={[isModalOpen, setIsModalOpen]}>
      <CartContext.Provider value={[cartMenuList, setCartMenuList]}>
        <div className="App">
          {/* <CategoryList
          categoryList={categoryList}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        /> */}
          <MenuList
            menuList={menuList}
            updateCartMenuList={(selectedMenu: SelectedMenuType) => {
              const newSelectedMenuList = [...cartMenuList]

              const cartMenu: CartMenuType = {
                cartId: new Date().getTime(),
                ...selectedMenu,
              }
              newSelectedMenuList.push(cartMenu)
              setCartMenuList(newSelectedMenuList)
            }}
          />
          <Cart
            cartMenuList={cartMenuList}
            updateCartMenuList={(newCartMenuList) => {
              setCartMenuList(newCartMenuList)
            }}
            deleteAllCartMenu={deleteAllCartMenu}
          />
          {isModalOpen.paymentMethod && (
            <ModalPortal
              closeModal={() => {
                setIsModalOpen({
                  ...isModalOpen,
                  paymentMethod: false,
                })
              }}
            >
              <button
                onClick={() => {
                  setIsModalOpen({
                    ...isModalOpen,
                    paymentMethod: false,
                  })
                }}
              >
                닫기
              </button>
              <PaymentMethodSelector />
            </ModalPortal>
          )}
          {isModalOpen.cachePayment && (
            <ModalPortal
              closeModal={() => {
                setIsModalOpen({ ...isModalOpen, cachePayment: false })
              }}
            >
              <button
                onClick={() => {
                  setIsModalOpen({ ...isModalOpen, cachePayment: false })
                }}
              >
                닫기
              </button>
              <CachePayment orderAmount={getCartTotalAmount(cartMenuList)} />
            </ModalPortal>
          )}
          {isModalOpen.loading && (
            <ModalPortal
              closeModal={() => {
                setIsModalOpen({ ...isModalOpen, loading: false })
              }}
            >
              <LoadingIndicator />
            </ModalPortal>
          )}
          {isModalOpen.receipt && (
            <ModalPortal
              closeModal={() => {
                setIsModalOpen({ ...isModalOpen, receipt: false })
              }}
            >
              <button
                onClick={() => {
                  deleteAllCartMenu()
                  setIsModalOpen({ ...isModalOpen, receipt: false })
                }}
              >
                닫기
              </button>
            </ModalPortal>
          )}
        </div>
      </CartContext.Provider>
    </ModalContext.Provider>
  )
}

export default App
