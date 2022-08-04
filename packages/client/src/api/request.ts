const API_END_POINT = `http://localhost:5500/api`

type Request = ({
  method,
  requestURL,
  body,
}: {
  method: string
  requestURL: string
  body?: string
}) => Promise<any>

export const request: Request = async ({ method, requestURL, body }) => {
  const URL = `${API_END_POINT}${requestURL}`
  const options = {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  try {
    const response = await fetch(URL, options)
    if (!response.ok) {
      const { name, message } = await response.json()
      const customError = new Error(message)
      customError.name = name
      throw customError
    }

    return response.json()
  } catch (error) {
    return error
  }
}
