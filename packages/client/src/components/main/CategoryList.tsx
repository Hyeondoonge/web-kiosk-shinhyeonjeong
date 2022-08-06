import React from 'react'
import styled from 'styled-components'

interface CategoryListProps {
  categoryList: { id: number; name: string }[]
  selectedCategoryIndex: number
  setSelectedCategoryIndex: (index: number) => void
}

export default function CategoryList({
  categoryList,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
}: CategoryListProps) {
  const onClickCategoryItem = (index: number) => {
    setSelectedCategoryIndex(index)
  }

  return (
    <StyledCategoryList>
      {categoryList.map(({ id, name }, index) => (
        <li
          key={id}
          onClick={() => {
            onClickCategoryItem(index)
          }}
        >
          <strong>{name}</strong>
        </li>
      ))}
    </StyledCategoryList>
  )
}

const StyledCategoryList = styled.ul`
  display: flex;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;
  gap: 50px;
`
