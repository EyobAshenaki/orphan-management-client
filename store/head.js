import { GraphQLError } from 'graphql'
import { fetchCoordinators, fetchUsers } from '~/services/user.service'

export const state = () => ({
  donorUsers: [],
  coordinators: [],
})

export const mutations = {
  SET_DONOR_USERS(state, donorUsers) {
    state.donorUsers = donorUsers
  },
  SET_COORDINATORS(state, coordinators) {
    state.coordinators = coordinators
  },
}

export const actions = {
  async fetchCoordinators({ commit }, simple) {
    try {
      const coordinators = await fetchCoordinators(simple)
      commit('SET_COORDINATORS', coordinators)
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

  async fetchDonorUsers({ commit }) {
    try {
      const donorUsers = Array.from(await fetchUsers()).filter(
        (user) => user.role === 'DONOR' && user.donor.nameInitials === ''
      )
      commit('SET_DONOR_USERS', donorUsers)
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
}
