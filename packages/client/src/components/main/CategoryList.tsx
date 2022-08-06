import { CategoryType } from '../../type'

interface CategoryListProps {
  categoryList: CategoryType[]
  selectedCategoryId: number
}

interface CategoryListItemProps {
  category: CategoryType
  isSelected: boolean
}

function CategoryListItem({
  category: { id, name },
  isSelected,
}: CategoryListItemProps) {
  return <li>{isSelected ? <strong>{name}</strong> : name}</li>
}

export function CategoryList({
  categoryList,
  selectedCategoryId,
}: CategoryListProps) {
  return (
    <ul>
      {categoryList.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          isSelected={selectedCategoryId === category.id}
        />
      ))}
    </ul>
  )
}
