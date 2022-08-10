import RadioButton from 'components/common/RadioButton'
import styled from 'styled-components'
import { OptionType, OptionWithDetailType, SelectedOptionType } from 'type'

interface MenuOptionListProps {
  optionList: OptionWithDetailType[]
  selectedOptionList: SelectedOptionType[]
  updateSelectedOption: (selectedOption: SelectedOptionType) => void
}

function MenuOption({
  option: { id: optionId, name: optionName, optionDetailList },
  selectedOptionList,
  updateSelectedOption,
}: {
  option: OptionWithDetailType
  selectedOptionList: SelectedOptionType[]
  updateSelectedOption: (selectedOption: SelectedOptionType) => void
}) {
  return (
    <StyledMenuOption>
      <div className="optionName">{optionName}</div>
      <ul>
        {optionDetailList.map(
          ({ id: optionDetailId, name: optionDetailName, price }, index) => {
            const isChecked =
              selectedOptionList.filter(({ id }) => optionId === id)[0]
                .optionDetail.id === optionDetailId

            return (
              <li key={optionDetailId}>
                <RadioButton
                  label={`${optionDetailName} ${
                    price !== 0 ? `(+${price}원)` : ''
                  }`}
                  value={optionDetailId}
                  name={optionName}
                  checked={isChecked}
                  onChange={() => {
                    updateSelectedOption({
                      id: optionId,
                      name: optionName,
                      optionDetail: {
                        id: optionDetailId,
                        name: optionDetailName,
                        price,
                      },
                    })
                  }}
                />
              </li>
            )
          }
        )}
      </ul>
    </StyledMenuOption>
  )
}

export default function MenuOptionList({
  optionList,
  updateSelectedOption,
  selectedOptionList,
}: MenuOptionListProps) {
  return (
    <StyledMenuOptionList>
      {optionList.map((option) => (
        <MenuOption
          key={option.id}
          option={option}
          selectedOptionList={selectedOptionList}
          updateSelectedOption={updateSelectedOption}
        />
      ))}
    </StyledMenuOptionList>
  )
}

const StyledMenuOption = styled.li`
  .optionName {
    font-weight: 600;
  }

  display: flex;
  flex-direction: column;
  gap: 10px;

  & ul li {
    margin: 10px 0;
  }
`

const StyledMenuOptionList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
