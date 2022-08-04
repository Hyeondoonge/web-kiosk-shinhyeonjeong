import React from 'react'
import styled from 'styled-components'

const StyledCategoryList = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;
  gap: 50px;
`

export default function CategoryList({
  categoryList,
}: {
  categoryList: { id: number; name: string }[]
}) {
  return (
    <StyledCategoryList>
      {categoryList.map(({ name }) => (
        <h1>{name}</h1>
      ))}
    </StyledCategoryList>
  )
}
