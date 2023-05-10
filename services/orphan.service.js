import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import {
  CreateOrphanWithNestedCreate,
  FetchOrphans,
  FetchOrphan,
  CountOrphans,
  CountGuardians,
} from '~/graphql/orphan.graphql'
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

export async function fetchOrphans(
  status = null,
  villageId = null,
  districtId = null,
  projectId = null
) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphans',
      query: print(FetchOrphans),
      variables: {
        status,
        villageId,
        districtId,
        projectId,
      },
    })
  )
  if (data) return data.orphans

  throw errors
}

export async function fetchOrphan(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphan',
      query: print(FetchOrphan),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function countOrphans(status = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountOrphans',
      query: print(CountOrphans),
      variables: {
        status,
      },
    })
  )
  if (data) return data._count_orphans

  throw errors
}

export async function countGuardians() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountGuardians',
      query: print(CountGuardians),
    })
  )
  if (data) return data._count_guardians

  throw errors
}
