import { GraphQLError } from 'graphql'

export const handleGQL = async (handler, params) => {
  try {
    const response = await handler(params)
    if (response) {
      if (!response?.data) {
        throw new Error('No data in response', response)
      }
      if (!response?.data?.data) {
        const { errors } = response.data
        const gqlErrors = Array.from(errors).map((e) => {
          return new GraphQLError(e.message, {
            extensions: e.extensions,
          })
        })
        throw gqlErrors
      }
      const { data } = response.data
      return { data, errors: null }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    // todo: handle error
    // todo: display error if needed
    return { errors: error, data: null }
  }
}
