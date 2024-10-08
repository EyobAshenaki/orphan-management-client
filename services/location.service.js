import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { handleGQL } from '~/helpers/graphql.helper'
import {
  FetchRegions,
  FetchRegion,
  CountRegions,
  CreateRegion,
  FetchZones,
  FetchZone,
  CountZones,
  CreateZone,
  FetchDistricts,
  FetchDistrict,
  CountDistricts,
  CreateDistrict,
  FetchVillages,
  CountVillages,
  CreateVillage,
} from '~/graphql/location.graphql'

export async function fetchRegions() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchRegions',
      query: print(FetchRegions),
    })
  )
  if (data) return data.regions
  throw errors
}

export async function fetchRegion(id = undefined) {
  if (!id) return
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchRegion',
      query: print(FetchRegion),
      variables: {
        id,
      },
    })
  )
  if (data) return data.region
  throw errors
}

export async function countRegions() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountRegions',
      query: print(CountRegions),
    })
  )
  if (data) return data._count_regions
  throw errors
}

export async function createRegion(regionInput) {
  const createRegion = async () => {
    return await graphqlInstance.post('', {
      operationName: 'CreateRegion',
      query: print(CreateRegion),
      variables: {
        input: regionInput,
      },
    })
  }
  const { data, errors } = await handleGQL(createRegion)
  if (data) return data.createRegion
  throw errors
}

/**
 * Fetch zones by regionId
 * If regionId is undefined, fetch all zones
 * @param {string} regionId
 * @returns `Zone[]`
 * @throws `GraphQLError[]`
 * @throws `Error`
 */
export async function fetchZones(regionId = undefined) {
  const fetchZones = async (regionId = undefined) => {
    const response = await graphqlInstance.post('', {
      operationName: 'FetchZones',
      query: print(FetchZones),
      variables: {
        regionId,
      },
    })
    return response
  }

  const { data, errors } = await handleGQL(fetchZones, regionId)
  if (data) return data.zones
  throw errors
}

export async function fetchZone(id = undefined) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchZone',
      query: print(FetchZone),
      variables: {
        id,
      },
    })
  )
  if (data) return data.zone
  throw errors
}
/**
 * Count zones by regionId
 * If regionId is undefined, count all zones
 * @param {string} regionId
 * @returns `Zone[]`
 * @throws `GraphQLError[]`
 * @throws `Error`
 */
export async function countZones(regionId = undefined) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountZones',
      query: print(CountZones),
      variables: {
        regionId,
      },
    })
  )
  if (data) return data._count_zones
  throw errors
}

export async function createZone(zoneInput) {
  const createZone = async () => {
    return await graphqlInstance.post('', {
      operationName: 'CreateZone',
      query: print(CreateZone),
      variables: {
        input: zoneInput,
      },
    })
  }
  const { data, errors } = await handleGQL(createZone)
  if (data) return data.createZone
  throw errors
}

/**
 * Fetch districts by zoneId
 * If zoneId is undefined, fetch all districts
 * @param {*} zoneId
 * @returns `District[]`
 * @throws `GraphQLError[]`
 * @throws `Error`
 */
export async function fetchDistricts(
  zoneId = undefined,
  projectId = undefined
) {
  const { data, errors } = await handleGQL(() => {
    return graphqlInstance.post('', {
      operationName: 'FetchDistricts',
      query: print(FetchDistricts),
      variables: {
        zoneId,
        projectId,
      },
    })
  })
  if (data) return data.districts
  throw errors
}

export async function countDistricts(zoneId = undefined) {
  const { data, errors } = await handleGQL(() => {
    return graphqlInstance.post('', {
      operationName: 'CountDistricts',
      query: print(CountDistricts),
      variables: {
        zoneId,
      },
    })
  })
  if (data) return data._count_districts
  throw errors
}

export async function fetchDistrict(id, withVillages = false) {
  const { data, errors } = await handleGQL(() => {
    return graphqlInstance.post('', {
      operationName: 'FetchDistrict',
      query: print(FetchDistrict),
      variables: {
        id,
        withVillages,
      },
    })
  })
  if (data) return data.district
  throw errors
}

export async function createDistrict(districtInput) {
  const createDistrict = async () => {
    return await graphqlInstance.post('', {
      operationName: 'CreateDistrict',
      query: print(CreateDistrict),
      variables: {
        input: districtInput,
      },
    })
  }
  const { data, errors } = await handleGQL(createDistrict)
  if (data) return data.createDistrict
  throw errors
}

/**
 * Fetch villages by districtId
 * If districtId is undefined, fetch all villages
 * @param {*} districtId
 * @returns `Village[]`
 * @throws `GraphQLError[]`
 * @throws `Error`
 */
export async function fetchVillages(
  districtId = undefined,
  socialWorkerId = undefined,
  withSocialWorkers = false
) {
  socialWorkerId =
    typeof socialWorkerId === 'string' && socialWorkerId.length > 0
      ? socialWorkerId
      : undefined
  const { data, errors } = await handleGQL(() => {
    return graphqlInstance.post('', {
      operationName: 'FetchVillages',
      query: print(FetchVillages),
      variables: {
        districtId,
        socialWorkerId,
        withSocialWorkers,
      },
    })
  })
  if (data) return data.villages
  throw errors
}

export async function countVillages(districtId = undefined) {
  const { data, errors } = await handleGQL(() => {
    return graphqlInstance.post('', {
      operationName: 'CountVillages',
      query: print(CountVillages),
      variables: {
        districtId,
      },
    })
  })
  if (data) return data._count_villages
  throw errors
}

export async function createVillage(villageInput) {
  const createVillage = async () => {
    return await graphqlInstance.post('', {
      operationName: 'CreateVillage',
      query: print(CreateVillage),
      variables: {
        input: villageInput,
      },
    })
  }
  const { data, errors } = await handleGQL(createVillage)
  if (data) return data.createVillage
  throw errors
}
