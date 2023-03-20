import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import {
  FetchDonors,
  CreateDonor,
  CreateDonorWithUser,
} from '~/graphql/donor.graphql'
import { handleGQL } from '~/helpers/graphql.helper'

export async function fetchDonors() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchDonors',
      query: print(FetchDonors),
    })
  )
  if (data) return data.donors
  throw errors
}

export async function createDonor(createDonorInput) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreateDonor',
      query: print(CreateDonor),
      variables: {
        input: createDonorInput,
      },
    })
  )
  if (data) return data.createDonor
  throw errors
}

export async function createDonorWithUser(createDonorWithUserInput) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreateDonorWithUser',
      query: print(CreateDonorWithUser),
      variables: {
        input: createDonorWithUserInput,
      },
    })
  )
  if (data) return data.createDonorWithUser
  throw errors
}
