import { OptionDetailType, OptionWithDetailType } from 'type'
import { request } from './request'

export const getOptionList: GetOptionListType = async (menuId: number) => {
  const response = await request({
    method: 'get',
    requestURL: `/options/${menuId}`,
  })

  if (response instanceof Error) {
    console.log('옵션을 가져오지 못했어요!')

    return response
  }

  const optionList: OptionWithDetailType[] = []
  for (const { id, name, detailList } of response.result.options) {
    const option: OptionWithDetailType = {
      id: Number(id),
      name: String(name),
      optionDetailList: detailList.map((detail: OptionDetailType) => ({
        ...detail,
      })),
    }
    optionList.push(option)
  }

  return optionList
}

type GetOptionListType = (
  menuId: number
) => Promise<OptionWithDetailType[] | Error>
