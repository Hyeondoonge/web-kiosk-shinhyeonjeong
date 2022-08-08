import { CategoryType } from '../../type'

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

function CategoryListItem({
  category: { id, name },
  isSelected,
  onClick,
}: CategoryListItemProps) {
  return (
    <li onClick={onClick}>{isSelected ? <strong>{name}</strong> : name}</li>
  )
}

export default function CategoryList({
  categoryList,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryListProps) {
  return (
    <ul>
      {categoryList.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          isSelected={selectedCategoryId === category.id}
          onClick={() => {
            setSelectedCategoryId(category.id)
          }}
        />
      ))}
    </ul>
  )
}
