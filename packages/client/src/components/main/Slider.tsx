import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'

const ITEM_WIDTH = 200

export default function Slider({
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
  const sliderRef = useRef<HTMLDivElement>(null)
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

      borderRef.current.style.left = `${
        (event.target as HTMLElement).offsetLeft
      }px`
    }
    setIsMouseDown(false)
  }

  const onMouseMove = (event: MouseEvent) => {
    if (!isMouseDown) return
    if (!isDrag) setIsDrag(true)

    const x = event.pageX
    const diffX = mouseDownX - x

    if (!sliderRef.current) return
    ;(sliderRef.current as Element).scrollLeft += diffX / 13
  }

  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      setIsDrag(false)
    }
    setIsMouseDown(false)
  }

  return (
    <StyledSlider
      ref={sliderRef}
      width={width}
      className="slider"
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
    </StyledSlider>
  )
}

const StyledSlider = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: calc(3rem + 45px);
  overflow: hidden;
  position: relative;
`

const StyledList = styled.ul<{ listLength: number }>`
  width: ${(props) =>
    props.listLength * ITEM_WIDTH + (30 * props.listLength - 1)}px;
  display: flex;
  list-style: none;
  font-size: 3rem;
  font-weight: 600;
  gap: 30px;

  & li {
    padding: 20px 0;
    width: ${ITEM_WIDTH}px;
    cursor: pointer;
    color: ${theme.palette.titleInActive};
    text-align: center;

    &.active {
      color: ${theme.palette.titleActive};
    }
  }
`
const StyledBorder = styled.div`
  width: ${ITEM_WIDTH}px;
  height: 5px;
  background-color: ${theme.palette.titleActive};
  transition: 0.5s;
  position: absolute;
  left: 0;
  bottom: 0;
`
