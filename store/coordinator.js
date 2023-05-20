import { GraphQLError } from 'graphql'
import { fetchDonors } from '~/services/donor.service'
import { fetchProjectOrphans } from '~/services/support.service'

export const state = () => ({
  donors: [],
  projectOrphans: [],
  selectedVillageId: null, // pass ✅
})

export const getters = {
  donorOptions: (state) =>
    Array.from(state?.donors).map((donor) => ({
      value: donor.id,
      text: `${donor.companyName} (${donor.nameInitials})`,
    })),
  supportPlanOrphansOptions: (state) =>
    Array.from(state?.projectOrphans).map((projectOrphan) => ({
      value: projectOrphan.id,
      text: `(${projectOrphan.gender}) ${projectOrphan.name} ${projectOrphan.father.firstName} ${projectOrphan.father.middleName} - ${projectOrphan.village.name}, ${projectOrphan.village.district.name}, ${projectOrphan.village.district.zone.name}`,
    })),
}

export const mutations = {
  SET_DONORS(state, payload) {
    if (typeof payload !== 'object' && !Array.isArray(payload))
      throw new TypeError('Payload must be an an array')
    state.donors = payload
  },
  SET_PROJECT_ORPHANS(state, payload) {
    if (typeof payload !== 'object' && !Array.isArray(payload))
      throw new TypeError('Payload must be an an array')
    state.projectOrphans = payload
  },
  SET_SELECTED_VILLAGE_ID(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.selectedVillageId = payload
  },

  UNSET_SELECTED_VILLAGE_ID(state) {
    state.selectedVillageId = null
  },
}

export const actions = {
  async fetchDonors({ commit }) {
    try {
      const donors = await fetchDonors()
      commit('SET_DONORS', donors)
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

  async fetchProjectOrphans({ commit }, { projectId, status }) {
    try {
      const orphans = await fetchProjectOrphans(projectId, status)
      commit('SET_PROJECT_ORPHANS', orphans)
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

  setSelectedVillageId({ commit }, villageId) {
    commit('SET_SELECTED_VILLAGE_ID', villageId)
  },

  unsetSelectedVillageId({ commit }) {
    commit('UNSET_SELECTED_VILLAGE_ID')
  },
}
