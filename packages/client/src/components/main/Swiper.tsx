import React, { MouseEvent, MouseEventHandler, useRef, useState } from 'react'
import styled from 'styled-components'

const StyledSwiper = styled.div<{ width: string }>`
  width: ${(props) => props.width}px;
  overflow-x: hidden;
  overflow: auto;
`

export default function Swiper({
  width,
  children,
  onClickItem,
}: {
  width: string
  children: React.ReactNode
  onClickItem: MouseEventHandler
}) {
  const swiperRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false) // 의미없는 mouse move 이벤트 처리 방지
  const [isDrag, setIsDrag] = useState(false)
  const [coordsMouseDown, setCoordsMouseDown] = useState({ x: 0 })

  const onMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true)
    const x = event.pageX
    if (!x) return
    setCoordsMouseDown({
      x,
    })
  }

  const onMouseUp = (event: MouseEvent) => {
    if (isDrag) {
      setIsDrag(false)
    } else {
      const clickedElement = event.target as Element
      if (clickedElement.tagName !== 'LI') return
      clickedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
      onClickItem(event)
    }
    setIsMouseDown(false)
  }

  const onMouseMove = (event: MouseEvent) => {
    if (!isMouseDown) return
    setIsDrag(true)

    const x = event.pageX
    const diffX = coordsMouseDown.x - x

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
      {children}
    </StyledSwiper>
  )
}
