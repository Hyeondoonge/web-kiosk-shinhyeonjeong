import React from 'react'
import styled from 'styled-components'

export default function CategoryList({
  categoryList,
}: {
  categoryList: { id: number; name: string }[]
}) {
  return (
    <StyledCategoryList>
      {categoryList.map(({ id, name }) => (
        <li key={id}>
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
