import { CategoryType } from '../../type'
import styled from 'styled-components/macro'
import Slider from './Slider'

interface CategoryListProps {
  categoryList: CategoryType[]
  selectedCategoryId: number
  setSelectedCategoryId: (id: number) => void
}

export default function CategoryList({
  categoryList,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryListProps) {
  const selectedCategoryIndex = categoryList.findIndex(
    ({ id }) => selectedCategoryId === id
  )
  const list = categoryList.map(({ name }) => name)

  return (
    <Slider
      focused={selectedCategoryIndex !== -1 ? selectedCategoryIndex : 0}
      list={list}
      onClickItem={(index) => {
        setSelectedCategoryId(categoryList[Number(index)].id)
      }}
    />
  )
}
