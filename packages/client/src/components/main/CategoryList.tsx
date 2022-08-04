import React from 'react'

export default function CategoryList({
  categoryList,
}: {
  categoryList: { id: number; name: string }[]
}) {
  return <div>{categoryList.map(({ name }) => name)}</div>
}
