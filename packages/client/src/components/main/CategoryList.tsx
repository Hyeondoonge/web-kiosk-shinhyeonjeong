import { CategoryType } from '../../type'
import styled from 'styled-components/macro'
import Swiper from './Swiper'

interface CategoryListProps {
  categoryList: CategoryType[]
  selectedCategoryId: number
  setSelectedCategoryId: (id: number) => void
}

interface CategoryListItemProps {
  category: CategoryType
  isSelected: boolean
}

function CategoryListItem({
  category: { id, name },
  isSelected,
}: CategoryListItemProps) {
  return (
    <StyledCategoryItem data-id={id} className={isSelected ? 'active' : ''}>
      {isSelected ? <strong>{name}</strong> : name}
    </StyledCategoryItem>
  )
}

export function CategoryList({
  categoryList,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryListProps) {
  return (
    <Swiper
      width="500"
      onClickItem={(event) => {
        const { id } = (event.target as HTMLElement).dataset
        setSelectedCategoryId(Number(id))

        // 하이라이트도 움직여야함.
      }}
    >
      <StyledCategoryList>
        {categoryList.map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            isSelected={selectedCategoryId === category.id}
          />
        ))}
      </StyledCategoryList>
    </Swiper>
  )
}

const StyledCategoryList = styled.ul`
  width: 150%;
  display: flex;
  gap: 100px;
  overflow-x: hidden;
`

const StyledCategoryItem = styled.li`
  display: flex;
  padding: 30px;
  user-select: none;
  transition: 1s;
  &.active {
    border-bottom: 5px solid black;
  }
`
