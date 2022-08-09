import { RefObject, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

interface ModalProps {
  children: React.ReactNode
  onClick: () => void
}

const StyledModal = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 1000;
  background-color: rgba(15, 14, 14, 0.5);
`

const ChildrenWrapper = styled.div`
  border: 1px solid black;
  width: fit-content;
  padding: 30px 50px;
  background-color: #f8f8f8;
`

function Modal({ children, onClick }: ModalProps) {
  return <StyledModal onClick={onClick}>{children}</StyledModal>
}

export default function ModalPortal({
  children,
  closeModal,
}: {
  children: React.ReactNode
  closeModal: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return createPortal(
    <Modal onClick={closeModal}>
      <ChildrenWrapper onClick={(event) => event.stopPropagation()}>
        {children}
      </ChildrenWrapper>
    </Modal>,
    document.body
  )
}
