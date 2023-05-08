import { GraphQLError } from 'graphql'
import { fetchDonors } from '~/services/donor.service'
import {
  createSupportPlan,
  fetchProjectOrphans,
  createPayment,
} from '~/services/support.service'

export const state = () => ({
  selectedProjectId: null,
  selectedProjectNumber: '',
  selectedSupportPlan: {
    id: null,
    name: '',
    adminFeePercentage: 0.0,
  },
  selectedPayment: {},
  donors: [],
  projectOrphans: [],
  selectedSocialWorkerId: null,
  selectedDistrictId: null,
  selectedVillageId: null,
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
  SET_SELECTED_PROJECT_ID(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.selectedProjectId = payload
  },
  SET_SELECTED_PROJECT_NUMBER(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.selectedProjectNumber = payload
  },
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
  SET_SELECTED_SUPPORT_PLAN(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an object')
    state.selectedSupportPlan = payload
  },
  SET_SELECTED_PAYMENT(state, payload) {
    if (typeof payload !== 'object')
      throw new TypeError('Payload must be an object')
    state.selectedPayment = payload
  },
  SET_SELECTED_SOCIAL_WORKER_ID(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    if (payload === '') throw new EvalError('Payload must not be empty')
    if (payload === 'undefined') payload = undefined
    if (payload === 'null') payload = null
    state.selectedSocialWorkerId = payload
  },
  SET_SELECTED_DISTRICT_ID(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.selectedDistrictId = payload
  },
  SET_SELECTED_VILLAGE_ID(state, payload) {
    if (typeof payload !== 'string')
      throw new TypeError('Payload must be a string')
    state.selectedVillageId = payload
  },

  UNSET_SELECTED_DISTRICT_ID(state) {
    state.selectedDistrictId = null
  },

  UNSET_SELECTED_VILLAGE_ID(state) {
    state.selectedVillageId = null
  },
}

export const actions = {
  setSelectedProjectId({ commit }, projectId) {
    commit('SET_SELECTED_PROJECT_ID', projectId)
  },

  setSelectedProjectNumber({ commit }, number) {
    commit('SET_SELECTED_PROJECT_NUMBER', number)
  },

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
  // todo: remove from store, it has no business here
  async createSupportPlan({ commit }, createSupportPlanInput) {
    try {
      await createSupportPlan(createSupportPlanInput)
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
  // todo: remove from store, it has no business here
  async createPayment({ commit }, createPaymentInput) {
    try {
      await createPayment(createPaymentInput)
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

  setSelectedSupportPlan({ commit }, supportPlan) {
    commit('SET_SELECTED_SUPPORT_PLAN', supportPlan)
  },

  setSelectedPayment({ commit }, payment) {
    commit('SET_SELECTED_PAYMENT', payment)
  },

  setSelectedSocialWorkerId({ commit }, socialWorkerId) {
    commit('SET_SELECTED_SOCIAL_WORKER_ID', socialWorkerId)
  },

  setSelectedDistrictId({ commit }, districtId) {
    commit('SET_SELECTED_DISTRICT_ID', districtId)
  },

  unsetSelectedDistrictId({ commit }) {
    commit('UNSET_SELECTED_DISTRICT_ID')
  },

  setSelectedVillageId({ commit }, villageId) {
    commit('SET_SELECTED_VILLAGE_ID', villageId)
  },

  unsetSelectedVillageId({ commit }) {
    commit('UNSET_SELECTED_VILLAGE_ID')
  },
}
