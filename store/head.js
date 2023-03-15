import { GraphQLError } from 'graphql'
import { fetchCoordinators } from '~/services/user.service'

export const state = () => ({
  coordinators: [],
  selectedCoordinator: {},
  socialWorkers: [],
  selectedSocialWorker: {},
})

export const mutations = {
  SET_COORDINATORS(state, coordinators) {
    state.coordinators = coordinators
  },
  SET_SELECTED_COORDINATOR(state, coordinator) {
    state.selectedCoordinator = coordinator
  },
}

export const actions = {
  async fetchCoordinators({ commit }) {
    try {
      const coordinators = await fetchCoordinators()
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
}
