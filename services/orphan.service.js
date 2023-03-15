import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { CreateOrphanWithNestedCreate } from '~/graphql/orphan.graphql'
import { handleGQL } from '~/helpers/graphql.helper'

export async function createOrphanWithNestedCreate(
  createOrphanWithNestedCreateInput
) {
  const create = async () => {
    const response = await graphqlInstance.post('', {
      operationName: 'CreateOrphanWithNestedCreate',
      query: print(CreateOrphanWithNestedCreate),
      variables: {
        input: createOrphanWithNestedCreateInput,
      },
    })
    return response
  }
  const { data } = await handleGQL(create)
  return data.create.user
}
