import { CategoryType } from '../../type'
import styled from 'styled-components/macro'
import Slider from './Slider'

interface CategoryListProps {
  categoryList: CategoryType[]
  selectedCategoryId: number
  setSelectedCategoryId: (id: number) => void
}

interface CategoryListItemProps {
  category: CategoryType
  isSelected: boolean
  onClick: React.MouseEventHandler<HTMLLIElement>
}

// function CategoryListItem({
//   category: { id, name },
//   isSelected,
// }: CategoryListItemProps) {
//   return (
//     <StyledCategoryItem data-id={id} className={isSelected ? 'active' : ''}>
//       {isSelected ? <strong>{name}</strong> : name}
//     </StyledCategoryItem>
//   )
// }

// export function CategoryList({
//   categoryList,
//   selectedCategoryId,
//   setSelectedCategoryId,
// }: CategoryListProps) {
//   return (
//     <Swiper
//       width="500"
//       onClickItem={(event) => {
//         const { id } = (event.target as HTMLElement).dataset
//         setSelectedCategoryId(Number(id))

//         // 하이라이트도 움직여야함.
//       }}
//     >
//       <StyledCategoryList>
//         {categoryList.map((category) => (
//           <CategoryListItem
//             key={category.id}
//             category={category}
//             isSelected={selectedCategoryId === category.id}
//           />
//         ))}
//       </StyledCategoryList>
//     </Swiper>
//   )
// }

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
      width={'100%'}
      focused={selectedCategoryIndex !== -1 ? selectedCategoryIndex : 0}
      list={list}
      onClickItem={(index) => {
        setSelectedCategoryId(categoryList[Number(index)].id)
      }}
    />
  )
}
