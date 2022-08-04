import React from 'react'

export default function categoryList({
  categoryList,
}: {
  categoryList: { id: number; name: string }[]
}) {
  return <div>{categoryList.map(({ name }) => name)}</div>
}
