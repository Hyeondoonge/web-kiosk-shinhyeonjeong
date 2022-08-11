import theme from 'style/theme'
import styled from 'styled-components'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  background?: string
}

export default function Button({ onClick, children, background }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} background={background}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ background?: string }>`
  width: 100%;
  background-color: ${(props) => props.background || theme.palette.primary1};
  padding: 1rem 3rem;
  color: ${theme.palette.offWhite};
  font-weight: 500;
  font-size: ${theme.font.sm};

  margin: 10px 0;
  border-radius: 4px;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }
`
