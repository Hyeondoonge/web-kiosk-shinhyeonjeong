import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const ITEM_WIDTH = 200

export default function Swiper({
  width,
  focused,
  onClickItem,
  list,
}: {
  width: string
  focused: number
  onClickItem: (index: number) => void
  list: string[]
}) {
  const swiperRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false) // 의미없는 mouse move 이벤트 처리 방지
  const [isDrag, setIsDrag] = useState(false)
  const [mouseDownX, setMouseDownX] = useState(0)

  const onMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true)
    const x = event.pageX
    if (!x) return
    setMouseDownX(x)
  }

  const onMouseUp = (event: MouseEvent) => {
    if (isDrag) {
      setIsDrag(false)
    } else {
      const clickedElement = event.target as Element
      if (clickedElement.tagName !== 'LI') return

      const { index } = (event.target as HTMLElement).dataset
      clickedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
      onClickItem(Number(index))

      if (!borderRef.current) return

      borderRef.current.style.transition = '0.5s'
      borderRef.current.style.left = `${
        (event.target as HTMLElement).offsetLeft
      }px`
    }
    setIsMouseDown(false)
  }

  const onMouseMove = (event: MouseEvent) => {
    if (!isMouseDown) return
    setIsDrag(true)

    const x = event.pageX
    const diffX = mouseDownX - x

    if (!swiperRef.current) return
    ;(swiperRef.current as Element).scrollLeft += diffX / 13
  }

  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      setIsDrag(false)
    }
    setIsMouseDown(false)
  }

  return (
    <StyledSwiper
      ref={swiperRef}
      className="swiper"
      width={width}
      onMouseDown={(event) => onMouseDown(event)}
      onMouseUp={(event) => onMouseUp(event)}
      onMouseMove={(event) => onMouseMove(event)}
      onMouseLeave={(event) => onMouseLeave(event)}
    >
      <StyledList listLength={list.length}>
        {list.map((name, index) => (
          <li
            key={index}
            data-index={index}
            className={focused === index ? 'active' : ''}
          >
            {name}
          </li>
        ))}
      </StyledList>
      <StyledBorder ref={borderRef} />
    </StyledSwiper>
  )
}

const StyledSwiper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 300px;
  overflow: hidden;
  position: relative;
`

const StyledList = styled.ul<{ listLength: number }>`
  width: ${(props) =>
    props.listLength * ITEM_WIDTH + (30 * props.listLength - 1)}px;
  padding: 0;
  display: flex;
  list-style: none;
  font-size: 3rem;
  font-weight: 600;
  gap: 30px;

  & li {
    width: ${ITEM_WIDTH}px;
    cursor: pointer;
    color: gray;
    text-align: center;

    &.active {
      color: black;
    }
  }
`
const StyledBorder = styled.div`
  width: ${ITEM_WIDTH}px;
  height: 5px;
  background-color: black;
  transition: 0.5s;
  position: absolute;
`