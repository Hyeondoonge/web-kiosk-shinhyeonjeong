import { OptionType, OptionWithDetailType } from 'type'

interface MenuOptionListProps {
  optionList: OptionWithDetailType[]
}

function MenuOption({
  option: { name: optionName, optionDetailList },
}: {
  option: OptionWithDetailType
}) {
  return (
    <li>
      {optionName}
      <ul>
        {optionDetailList.map(({ id, name: optionDetailName, price }) => (
          <li key={id}>
            <input type="radio" value={id} name={optionName} />
            <label htmlFor={String(id)}>
              <>
                {optionDetailName}
                {price !== 0 && `(+${price})`}
              </>
            </label>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function MenuOptionList({ optionList }: MenuOptionListProps) {
  return (
    <ul>
      {optionList.map((option) => (
        <MenuOption key={option.id} option={option} />
      ))}
    </ul>
  )
}
