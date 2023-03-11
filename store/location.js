import { GraphQLError } from 'graphql'
import {
  fetchRegions,
  createRegion,
  fetchZones,
  createZone,
} from '~/services/location.service'

export const state = () => ({
  regions: [],
  selectedRegion: {},
  regionInput: {},
  zones: [],
  zoneInput: {},
  districts: [],
  districtInput: {},
  villages: [],
  villageInput: {},
})

export const mutations = {
  SET_REGIONS(state, payload) {
    if (typeof payload !== 'object' && !Array.isArray(payload))
      throw new TypeError('Payload must be an an array')
    state.regions = payload
  },
  SET_SELECTED_REGION(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an an object')
    state.selectedRegion = payload
  },
  SET_REGION_INPUT(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an an object')
    state.regionInput = payload
  },
  SET_ZONES(state, payload) {
    if (typeof payload !== 'object' && !Array.isArray(payload))
      throw new TypeError('Payload must be an an array')
    state.zones = payload
  },
  SET_ZONE_INPUT(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an an object')
    state.zoneInput = payload
  },
  SET_DISTRICTS(state, payload) {
    if (typeof payload !== 'object' && !Array.isArray(payload))
      throw new TypeError('Payload must be an an array')
    state.districts = payload
  }
}

export const actions = {
  async fetchRegions({ commit }) {
    try {
      const regions = await fetchRegions()
      commit('SET_REGIONS', regions)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error })
    }
  },
  async createRegion({ commit, state }) {
    try {
      const region = await createRegion(state.regionInput)
      commit('SET_REGIONS', [...state.regions, region])
    } catch (error) {
      if (Array.from(error)[0] instanceof GraphQLError) {
        error.forEach((e) => {
          this.$toaster.showToast({
            content: e.message,
            state: 'error',
          })
        })
        // eslint-disable-next-line no-console
      } else console.error(error)
      throw error
    }
  },
  // todo: update Region
  // todo: delete Region
  async fetchZones({ commit, state }) {
    try {
      const zones = await fetchZones(state.selectedRegion.id)
      commit('SET_ZONES', zones)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error })
    }
  },
  async createZone({ commit, state }) {
    try {
      const zone = await createZone(state.zoneInput)
      commit('SET_ZONES', [...state.zones, zone])
    } catch (error) {
      if (Array.from(error)[0] instanceof GraphQLError) {
        error.forEach((e) => {
          this.$toaster.showToast({
            content: e.message,
            state: 'error',
          })
        })
        // eslint-disable-next-line no-console
      } else console.error(error)
      throw error
    }
  }
}
