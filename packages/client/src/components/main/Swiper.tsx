import React, { MouseEvent, useRef, useState } from 'react'
import styled from 'styled-components'

const StyledSwiper = styled.div`
  display: flex;
  width: 500px;
  height: 200;
  gap: 50px;
  overflow: auto;
  overflow-x: hidden;
`

export default function Swiper({ children }: { children: React.ReactNode }) {
  const swiperRef = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState(false) // 의미없는 mouse move 이벤트 처리 방지
  const [isDrag, setIsDrag] = useState(false)
  const [coordsMouseDown, setCoordsMouseDown] = useState({ x: 0 })

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true)
    const x = event.pageX
    if (!x) return
    setCoordsMouseDown({
      x,
    })
  }

  const onTouchDown = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsMouseDown(true)
    const x = event.changedTouches[0].pageX
    if (!x) return
    setCoordsMouseDown({
      x,
    })
  }

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      console.log('drag')
      setIsDrag(false)
    } else {
      ;(event.target as Element).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
      // change Selected Item
      console.log('click')
    }
    setIsMouseDown(false)
  }

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return
    setIsDrag(true)

    let x, y
    if (event.pageX) {
      x = event.pageX
    } else {
      x = event.changedTouches[0].pageX
    }

    const diffX = coordsMouseDown.x - x
    // const diffY = coordsMouseDown.y - event.pageY;

    if (!swiperRef.current) return
    console.log(diffX, swiperRef.current.scrollLeft)
    swiperRef.current.scrollLeft = swiperRef.current.scrollLeft + diffX / 10

    console.log(swiperRef.current.scrollLeft)
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
      onMouseDown={(event) => onMouseDown(event)}
      onMouseUp={(event) => onMouseUp(event)}
      onMouseMove={(event) => onMouseMove(event)}
      onMouseLeave={(event) => onMouseLeave(event)}
      onTouchStart={(event) => onTouchDown(event)}
      onTouchEnd={(event) => onMouseUp(event)}
      onTouchMove={(event) => onMouseMove(event)}
    >
      {children}
    </StyledSwiper>
  )
}
