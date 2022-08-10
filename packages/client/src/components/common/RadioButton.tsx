import { ChangeEvent, ChangeEventHandler } from 'react'
import theme from 'style/theme'
import styled from 'styled-components'

interface RadioButtonProps {
  value?: any
  name?: string
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
}

export default function RadioButton({
  value,
  name,
  checked,
  label,
  onChange,
}: RadioButtonProps) {
  return (
    <StyledRadioButton>
      {label}
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkmark"></span>
    </StyledRadioButton>
  )
}

const StyledRadioButton = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: ${theme.font.sm};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default checkbox */
  input {
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: ${theme.palette.primary1};
    border-radius: 50%;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
  }

  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 5px;
    top: 5px;
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
  }
`
