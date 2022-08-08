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
    <li>
      {optionName}
      <ul>
        {optionDetailList.map(
          ({ id: optionDetailId, name: optionDetailName, price }, index) => {
            const isChecked =
              selectedOptionList.filter(({ id }) => optionId === id)[0]
                .optionDetail.id === optionDetailId

            return (
              <li key={optionDetailId}>
                <input
                  type="radio"
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
                <label htmlFor={String(optionDetailId)}>
                  <>
                    {optionDetailName}
                    {price !== 0 && `(+${price})`}
                  </>
                </label>
              </li>
            )
          }
        )}
      </ul>
    </li>
  )
}

export default function MenuOptionList({
  optionList,
  updateSelectedOption,
  selectedOptionList,
}: MenuOptionListProps) {
  return (
    <ul>
      {optionList.map((option) => (
        <MenuOption
          key={option.id}
          option={option}
          selectedOptionList={selectedOptionList}
          updateSelectedOption={updateSelectedOption}
        />
      ))}
    </ul>
  )
}
