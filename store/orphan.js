import { GraphQLError } from 'graphql'
import { fetchOrphan } from '~/services/orphan.service'

export const state = () => ({
  orphan: {
    id: undefined,
    code: undefined,
    name: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    placeOfBirth: undefined,
    religion: undefined,
    spokenLanguages: [],
    hobbies: [],
    father: undefined,
    mother: undefined,
    guardian: undefined,
    healthStatus: undefined,
    educationalRecord: undefined,
    documents: [],
    housing: undefined,
    assets: [],
    photos: undefined,
  },
})

export const getters = {
  orphanData: (state) => state.orphan,
}

export const mutations = {
  SET_ORPHAN(state, payload) {
    state.orphan = payload
  },

  MODIFY_ORPHAN(state, payload) {
    state.orphan = { ...state.orphan, ...payload }
  },
}

export const actions = {
  async fetchOrphanData({ commit }, id) {
    try {
      const data = await fetchOrphan(id)
      console.log(data)
      this.$toaster.showToast({
        content: 'Orphan fetched',
        state: 'success',
      })
      commit('SET_ORPHAN', data)
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
