import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { handleGQL } from '~/helpers/graphql.helper'
import {
  FetchSocialWorkers,
  CountSocialWorkers,
  FetchSocialWorker,
} from '~/graphql/social-worker.graphql'

export async function fetchSocialWorkers() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchSocialWorkers',
      query: print(FetchSocialWorkers),
    })
  )
  if (data) return data.socialWorkers
  throw errors
}
export async function countSocialWorkers() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountSocialWorkers',
      query: print(CountSocialWorkers),
    })
  )
  if (data) return data._count_socialWorkers
  throw errors
}

export async function fetchSocialWorker(id) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchSocialWorker',
      query: print(FetchSocialWorker),
      variables: { id },
    })
  )
  if (data) return data.socialWorker
  throw errors
}
