import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import {
  CreateOrphanWithNestedCreate,
  CreateOrphanPhoto,
  CreateOrphanLetter,
  FetchOrphans,
  FetchOrphan,
  CountOrphans,
  CountGuardians,
  // OrphanDetails queries
  FetchOrphanDetail,
  FetchOrphanPersonal,
  UpdateOrphanPersonal,
  UpdateFather,
  FetchOrphanEducation,
  FetchOrphanEducationHistory,
  FetchLatestEducationalRecord,
  CreateEducationalRecord,
  DeleteEducationalRecord,
  FetchOrphanFamily,
  FetchOrphanGuardian,
  FetchOrphanHealthStatus,
  FetchOrphanHealthStatuses,
  FetchOrphanPhotos,
  FetchOrphanLetters,
  FetchOrphanDocuments,
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
  return data.createOrphanWithNestedCreate
}

export async function createOrphanLetter(createOrphanLetterInput) {
  const create = async () => {
    const response = await graphqlInstance.post('', {
      operationName: 'CreateOrphanLetter',
      query: print(CreateOrphanLetter),
      variables: {
        input: createOrphanLetterInput,
      },
    })
    return response
  }
  const { data } = await handleGQL(create)
  return data.createOrphanLetter
}

export async function createOrphanPhoto(createOrphanPhotoInput) {
  const create = async () => {
    const response = await graphqlInstance.post('', {
      operationName: 'CreateOrphanPhoto',
      query: print(CreateOrphanPhoto),
      variables: {
        input: createOrphanPhotoInput,
      },
    })
    return response
  }
  const { data } = await handleGQL(create)
  return data.createOrphanPhoto
}

export async function fetchOrphans(
  // status = null,
  // villageId = null,
  // districtId = null,
  // projectId = null
  filter = {}
) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphans',
      query: print(FetchOrphans),
      variables: {
        ...filter,
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

export async function countOrphans(status = null, districtId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountOrphans',
      query: print(CountOrphans),
      variables: {
        status,
        districtId,
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

// WQ: Orphan Details

export async function fetchOrphanDetail(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanDetail',
      query: print(FetchOrphanDetail),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanPersonal(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanPersonal',
      query: print(FetchOrphanPersonal),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function updateOrphanPersonal(updateOrphanPersonalInput) {
  let updateFather = {}
  let updateOrphanPersonal = {}
  if (
    updateOrphanPersonalInput?.fatherName ||
    updateOrphanPersonalInput?.grandFatherName
  ) {
    const { data } = await handleGQL(async () => {
      const response = await graphqlInstance.post('', {
        operationName: 'UpdateFather',
        query: print(UpdateFather),
        variables: {
          input: {
            orphanId: updateOrphanPersonalInput.id,
            firstName: updateOrphanPersonalInput.fatherName,
            lastName: updateOrphanPersonalInput.grandFatherName,
          },
        },
      })
      return response
    })
    updateFather = data.updateFather
  }
  const { data } = await handleGQL(async () => {
    const { id, fatherName, grandFatherName, orphanName, ...rest } =
      updateOrphanPersonalInput
    const response = await graphqlInstance.post('', {
      operationName: 'UpdateOrphanPersonal',
      query: print(UpdateOrphanPersonal),
      variables: {
        input: {
          id,
          ...rest,
        },
      },
    })
    return response
  })
  updateOrphanPersonal = data.updateOrphan

  return { ...updateOrphanPersonal, updateFather }
}

export async function fetchOrphanEducation(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanEducation',
      query: print(FetchOrphanEducation),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanEducationHistory(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanEducationHistory',
      query: print(FetchOrphanEducationHistory),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchLatestEducationalRecord(id = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchLatestEducationalRecord',
      query: print(FetchLatestEducationalRecord),
      variables: {
        id,
      },
    })
  )
  if (data) return data?.orphan?.latestOrphanData?.educationalRecord

  throw errors
}

export async function createLatestEducationalRecord(
  createEducationalRecordInput = { enrollmentStatus: 'ENROLLED' }
) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreateEducationalRecord',
      query: print(CreateEducationalRecord),
      variables: {
        input: createEducationalRecordInput,
      },
    })
  )
  if (data) return data?.orphan?.latestOrphanData?.educationalRecord

  throw errors
}

export async function deleteEducationalRecord(id) {
  const { data, errors } = await handleGQL(() => {
    return graphqlInstance.post('', {
      operationName: 'DeleteEducationalRecord',
      query: print(DeleteEducationalRecord),
      variables: {
        id,
      },
    })
  })
  if (data) return data?.id

  throw errors
}

export async function fetchOrphanFamily(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanFamily',
      query: print(FetchOrphanFamily),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanGuardian(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanGuardian',
      query: print(FetchOrphanGuardian),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanHealthStatus(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanHealthStatus',
      query: print(FetchOrphanHealthStatus),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanHealthStatuses(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanHealthStatuses',
      query: print(FetchOrphanHealthStatuses),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanPhotos(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanPhotos',
      query: print(FetchOrphanPhotos),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanLetters(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanLetters',
      query: print(FetchOrphanLetters),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}

export async function fetchOrphanDocuments(orphanId = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchOrphanDocuments',
      query: print(FetchOrphanDocuments),
      variables: {
        orphanId,
      },
    })
  )
  if (data) return data.orphan

  throw errors
}
