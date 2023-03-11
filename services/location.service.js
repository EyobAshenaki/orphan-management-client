import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { handleGQL } from '~/helpers/graphql.helper'
import {
  Regions,
  CreateRegion,
  Zones,
  CreateZone,
  Districts,
  Villages,
} from '~/graphql/location.graphql'

export async function fetchRegions() {
  const fetchRegions = async () => {
    const response = await graphqlInstance.post('', {
      operationName: 'Regions',
      query: print(Regions),
    })
    return response
  }

  const { data, errors } = await handleGQL(fetchRegions)
  if (data) return data.regions
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
      operationName: 'Zones',
      query: print(Zones),
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
export async function fetchDistricts(zoneId = undefined) {
  const fetchDistrictsByZone = async (zoneId = undefined) => {
    const response = await graphqlInstance.post('', {
      operationName: 'Districts',
      query: print(Districts),
      variables: {
        zoneId,
      },
    })
    return response
  }

  const { data, errors } = await handleGQL(fetchDistrictsByZone, zoneId)
  if (data) return data.districts
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
export async function fetchVillages(districtId = undefined) {
  const fetchVillagesByDistrict = async (districtId = undefined) => {
    const response = await graphqlInstance.post('', {
      operationName: 'Villages',
      query: print(Villages),
      variables: {
        districtId,
      },
    })
    return response
  }

  const { data, errors } = await handleGQL(fetchVillagesByDistrict, districtId)
  if (data) return data.villages
  throw errors
}
